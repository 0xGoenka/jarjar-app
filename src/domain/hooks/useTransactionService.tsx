import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";

export const useTransactionService = () => ({
  user_ledger_txs: useObservable(
    useServices().transactionService.userTxsInLedger
  ),
  user_pooled_txs: useObservable(useServices().ws.userTxsInPool),
});

export const useTransactionResult = () =>
  useObservable(useServices().masternodeWs.result);
