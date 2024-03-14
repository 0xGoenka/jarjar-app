import { WritableObservable, observable } from "micro-observables";
import { AuthService } from "./auth.service";
import type { WalletAccount } from "@mysten/wallet-standard";
import { T_Account } from "./auth.api";
import { UserApi } from "./user.api";

export class UserService {
  userSuiAccount = observable<WalletAccount | null>(null);
  account: WritableObservable<null | T_Account> = observable(null);

  constructor(
    private readonly authService: AuthService,
    private readonly userApi: UserApi
  ) {
    this.userSuiAccount.subscribe((account) => {
      console.log({ account });
      if (account) {
        this.connect();
      } else {
        this.disconnect();
      }
    });

    setInterval(() => {
      this.fetchAccount();
    }, 1000);
  }

  setUserAccount(account: WalletAccount | null) {
    this.userSuiAccount.set(account);
  }

  async disconnect() {
    console.log("disconnect");
  }

  async fetchAccount() {
    const account = await this.userApi.fetchAccount();
    this.account.set(account);
  }

  async connect() {
    const connect = await this.authService.connect(this.userSuiAccount.get());
    if (connect) {
      this.account.set(connect.account);
    }
  }
}
