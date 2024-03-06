import { WritableObservable, observable } from "micro-observables";
import { ApiService } from "@/domain/core/api.service";

export class AccountService {
  private apiService: ApiService;
  public masternodes: WritableObservable<any> = observable([]);
  public miners: WritableObservable<any> = observable([]);
  public users: WritableObservable<any> = observable([]);
  public accounts = observable([]);

  constructor(apiService: ApiService) {
    this.apiService = apiService;
    // this.fetchMasternodes();
    // this.fetchAccounts();
  }

  async fetchMasternodes() {
    try {
      const response = await this.apiService.get("/explorer/masternodes");
      this.masternodes.set(response.data as any);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAccounts() {
    try {
      const response = await this.apiService.get("/explorer/accounts");
      this.accounts.set(response.data as any);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
