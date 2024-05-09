import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";

export const useMasternodeWsService = () => ({
  isGenerating: useObservable(useServices().masternodeWs.isGenerating),
});
