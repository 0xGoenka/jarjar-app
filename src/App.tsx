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

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
          <WalletProvider>
            <div className="bg-background flex">
              <Route path="/" exact component={Home} />
            </div>
          </WalletProvider>
        </SuiClientProvider>
        <ToastContainer theme="dark" />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
