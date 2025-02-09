import { P2WPKHTxnBuilder } from './txn/txn_builder'
import { TxnBuilderDex } from './txn/txn_builder_dex'
import { TxnBuilderUtxo } from './txn/txn_builder_utxo'
import { TxnBuilderAccount } from './txn/txn_builder_account'
import { TxnBuilderOracles } from './txn/txn_builder_oracles'
import { TxnBuilderLiqPool } from './txn/txn_builder_liq_pool'
import { TxnBuilderGovernance } from './txn/txn_builder_governance'
import { TxnBuilderICXOrderBook } from './txn/txn_builder_icxorderbook'
import { TxnBuilderMasternode } from './txn/txn_builder_masternode'
import { TxnBuilderLoans } from './txn/txn_builder_loans'
import { TxnBuilderVault } from './txn/txn_builder_vault'

export * from './provider'
export * from './txn/txn_fee'
export * from './txn/txn_builder'
export * from './txn/txn_builder_dex'
export * from './txn/txn_builder_utxo'
export * from './txn/txn_builder_account'
export * from './txn/txn_builder_oracles'
export * from './txn/txn_builder_loans'
export * from './txn/txn_builder_vault'
export * from './txn/txn_builder_liq_pool'
export * from './txn/txn_builder_icxorderbook'
export * from './txn/txn_builder_masternode'

/**
 * All in one transaction builder.
 * Currently only support sending from P2PKH operations.
 */
export class P2WPKHTransactionBuilder extends P2WPKHTxnBuilder {
  public readonly dex = new TxnBuilderDex(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly utxo = new TxnBuilderUtxo(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly account = new TxnBuilderAccount(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly liqPool = new TxnBuilderLiqPool(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly oracles = new TxnBuilderOracles(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly governance = new TxnBuilderGovernance(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly icxorderbook = new TxnBuilderICXOrderBook(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly masternode = new TxnBuilderMasternode(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly loans = new TxnBuilderLoans(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
  public readonly vault = new TxnBuilderVault(this.feeProvider, this.prevoutProvider, this.ellipticPairProvider, this.network)
}
