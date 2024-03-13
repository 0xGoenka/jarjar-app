import { observable } from "micro-observables";
import { AuthService } from "./auth.service";
import type { WalletAccount } from "@mysten/wallet-standard";

export class UserService {
  userSuiAccount = observable<WalletAccount | null>(null);

  constructor(private readonly authService: AuthService) {
    this.userSuiAccount.subscribe((account) => {
      if (account) {
        this.connect();
      } else {
        this.disconnect();
      }
    });
  }

  setUserAccount(account: WalletAccount | null) {
    this.userSuiAccount.set(account);
  }

  async disconnect() {
    console.log("disconnect");
  }

  async connect() {
    await this.authService.connect(this.userSuiAccount.get());
  }
}
