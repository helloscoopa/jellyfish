import { ConfigService } from '@nestjs/config'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

export abstract class RootServer {
  app?: NestFastifyApplication
  adapter = new FastifyAdapter({ logger: true })

  abstract create (): Promise<NestFastifyApplication>

  async configure (app: NestFastifyApplication, config: ConfigService): Promise<void> {
    app.enableCors({
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type'],
      maxAge: 60 * 24 * 7
    })

    // for ocean-api & rich-list-api
    // avoid duplication for now due to small
    // TODO(canonbrother): move to its own class while wide variety of configuration
    const version = config.get<string>('API_VERSION') as string
    const network = config.get<string>('API_NETWORK') as string

    if (version !== undefined && network !== undefined) {
      app.setGlobalPrefix(`${version}/${network}`, {
        exclude: [
          '/_actuator/probes/liveness',
          '/_actuator/probes/readiness'
        ]
      })
    }
  }

  async init (app: NestFastifyApplication, config: ConfigService): Promise<void> {
    const port = config.get<number>('PORT', 3000)
    await app.listen(port, '0.0.0.0')
  }

  async start (): Promise<void> {
    await this.stop() // safety start

    this.app = await this.create()
    const config = this.app.get(ConfigService)

    await this.configure(this.app, config)
    await this.init(this.app, config)
  }

  async stop (): Promise<void> {
    await this.app?.close()
  }
}
