import "./App.css";
import "@mysten/dapp-kit/dist/index.css";
import { LandingPage } from "./components/pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import "react-toastify/dist/ReactToastify.css";

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { ToastContainer } from "react-toastify";
import { useAuthService } from "./domain/hooks/useAuthService";
import { Navigator } from "./Navigator";

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

function App() {
  const { isConnectedToJarJarRpc } = useAuthService();

  if (isConnectedToJarJarRpc) return <Navigator />;

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider>
          <div className="bg-background flex">
            <LandingPage />
          </div>
        </WalletProvider>
      </SuiClientProvider>
      <ToastContainer theme="dark" />
    </QueryClientProvider>
  );
}

export default App;
