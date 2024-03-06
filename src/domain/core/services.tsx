import { createContext, useContext } from "react";
import { ApiService } from "./api.service";
import { NetworkStatusService } from "../services/networkstatus";
import { AccountService } from "../services/account.service";
import { TransactionService } from "../services/transactions.service";
import { UserService } from "../services/user.service";

const apiService = new ApiService();
const networkStatusService = new NetworkStatusService(apiService);
const accountService = new AccountService(apiService);
const transactionService = new TransactionService(apiService);
const userService = new UserService(apiService);

export const services = {
  networkStatusService,
  accountService,
  transactionService,
  userService,
};

export type Services = typeof services;
export const ServicesContext = createContext<Services | null>(null);
export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) {
    throw Error("ServiceContext not defined");
  }
  return services;
}

export async function initializeServices() {
  return Promise.all(
    Object.values(services)
      .map((service) => {
        if ("init" in service) {
          return service.init();
        }
      })
      .filter(Boolean)
  );
}

export async function resetServices() {
  return Promise.all(
    Object.values(services)
      .filter((service) => service !== cognitoAuthService)
      .map((service) => {
        if ("reset" in service) {
          return service.reset();
        }
      })
      .filter(Boolean)
  );
}
