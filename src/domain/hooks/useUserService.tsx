import { useObservable } from "micro-observables";
import { useServices } from "../core/services";

export const useUserService = () => ({
  account: useObservable(useServices().userService.account),
});
