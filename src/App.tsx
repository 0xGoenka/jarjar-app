import "./App.css";
import "@mysten/dapp-kit/dist/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Sidebar } from "./components/ui/sidebar";
import { Home } from "./components/pages/Home";
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
import { Transfer } from "./components/pages/Transfer";
import { GenerateText } from "./components/pages/GenerateText";
import { SubnetTextStatus } from "./components/pages/SubnetTextStatus";
import { SubnetDashboard } from "./components/pages/SubnetDashboard/SubnetDashboard";

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

function App() {
  const { isConnectedToJarJarRpc } = useAuthService();

  if (isConnectedToJarJarRpc)
    return (
      <Router>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
            <WalletProvider>
              <div className="bg-background flex">
                <Sidebar className="lg:block w-60" />
                <Route path="/" exact component={Transfer} />
                {/* <Route path="/generate_llm" exact component={SubnetDashboard} /> */}
                <Route path="/generate_llm" exact component={GenerateText} />
                <Route path="/generate_llm:id" exact component={GenerateText} />
              </div>
            </WalletProvider>
          </SuiClientProvider>
          <ToastContainer theme="dark" />
        </QueryClientProvider>
      </Router>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider>
          <div className="bg-background flex">
            <Home></Home>
          </div>
        </WalletProvider>
      </SuiClientProvider>
      <ToastContainer theme="dark" />
    </QueryClientProvider>
  );
}

export default App;
