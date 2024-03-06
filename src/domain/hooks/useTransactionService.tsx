import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";

export const useTransactionService = () => ({
  ledger_txs: useObservable(useServices().transactionService.ledger_txs),
  pooled_txs: useObservable(useServices().transactionService.pooled_txs),
});
