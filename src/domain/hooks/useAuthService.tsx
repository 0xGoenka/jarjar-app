import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";

export const useAuthService = () => ({
  isConnectedToJarJarRpc: useObservable(
    useServices().authService.isConnectedToJarJarRpc
  ),
});
