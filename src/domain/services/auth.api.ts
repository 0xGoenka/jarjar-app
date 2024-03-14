import { ApiService } from "../core/api.service";

export enum E_AccountType {
  user = "user",
  system = "system",
  bridge = "bridge",
  burn = "burn",
  miner = "miner",
  masternode = "masternode",
}

export type T_Account = {
  pubkey: string;
  type: E_AccountType;
  metadata: object;
  balance: number;
};

type AuthConnectResponse = {
  access_token: string;
  account: T_Account;
};

export class AuthApi {
  constructor(private readonly apiService: ApiService) {}

  async generateSignInMessage() {
    const res = await this.apiService.get("/auth/generateSignInMessage");
    return res.data as string;
  }

  async connect(signature: string, message: string, publicKey: string) {
    const res: { data: AuthConnectResponse } = await this.apiService.post(
      "/auth/connect",
      {
        signature,
        message,
        publicKey,
      }
    );
    this.setBearerToken(res.data.access_token);
    return res.data;
  }

  setBearerToken(token: string | null) {
    if (!token) return;
    localStorage.setItem("access_token", token);
    this.apiService.setBearerToken(token);
  }
}
