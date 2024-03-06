import { ApiService } from "./../core/api.service";
import { observable } from "micro-observables";
import { AuthService } from "./auth.service";

export class UserService {
  userSuiAccount = observable<any>(null);

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService
  ) {
    this.userSuiAccount.subscribe((account) => {
      if (account) {
        this.connect();
      } else {
        this.disconnect();
      }
    });
  }

  setUserAccount(account: any | null) {
    this.userSuiAccount.set(account);
  }

  async disconnect() {
    console.log("disconnect");
  }

  async connect() {
    await this.authService.connect(this.userSuiAccount.get());
  }
}
