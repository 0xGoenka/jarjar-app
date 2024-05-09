import { WritableObservable, observable } from "micro-observables";
import { ApiService } from "@/domain/core/api.service";

export type T_NetworkStatus = {
  transactionPerSecond: number;
  masternodeOnline: number;
  minerOnline: number;
  activeUser: number;
};

export class NetworkStatusService {
  private apiService: ApiService;
  public networkStatusData: WritableObservable<T_NetworkStatus> = observable({
    transactionPerSecond: 0,
    masternodeOnline: 0,
    minerOnline: 0,
    activeUser: 0,
  });

  constructor(apiService: ApiService) {
    this.apiService = apiService;
    // this.fetchStatus();
    // setInterval(() => {
    //   this.fetchStatus();
    // }, 1000 * 60);
  }

  async fetchStatus() {
    try {
      const response = await this.apiService.get("/explorer/network_status");
      this.networkStatusData.set(response.data as T_NetworkStatus);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
