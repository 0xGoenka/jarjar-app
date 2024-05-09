import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";

export const useAccountService = () => ({
  masternodes: useObservable(useServices().accountService.masternodes),
  accounts: useObservable(useServices().accountService.accounts),
});
