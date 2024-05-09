import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useServices } from "./domain/core/services";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { JarJarMenu } from "./components/ui/menu";
import { Transfer } from "./components/pages/Transfer";
import { GenerateText } from "./components/pages/GenerateText";
import { ToastContainer } from "react-toastify";

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

export const Navigator = () => {
  const { userService } = useServices();

  useEffect(() => {
    userService.fetchAccount();
  }, [userService]);
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
          <WalletProvider>
            <div className="my-3">
              <JarJarMenu />
            </div>
            <div className="bg-background flex">
              {/* <Sidebar className="lg:block w-60" /> */}
              <Redirect exact from="/" to="chat" />
              <Route path="/transfer" exact component={Transfer} />
              {/* <Route path="/generate_llm" exact component={SubnetDashboard} /> */}
              <Route path="/chat" exact component={GenerateText} />
              <Route path="/chat:id" exact component={GenerateText} />
            </div>
          </WalletProvider>
        </SuiClientProvider>
        <ToastContainer theme="dark" />
      </QueryClientProvider>
    </Router>
  );
};
