import { ApiService } from "../core/api.service";
import { T_Account } from "./auth.api";

export class UserApi {
  constructor(private readonly apiService: ApiService) {}

  async fetchAccount() {
    const res = await this.apiService.get("/account/me");
    return res.data as T_Account;
  }
}
