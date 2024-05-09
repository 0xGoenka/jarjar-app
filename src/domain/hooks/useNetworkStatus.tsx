import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";

export const useNetworkStatus = () =>
  useObservable(useServices().networkStatusService.networkStatusData);
