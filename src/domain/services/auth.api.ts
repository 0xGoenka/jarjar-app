import { ApiService } from "../core/api.service";

type AuthConnectResponse = {
  access_token: string;
  account: any;
};

export class AuthApi {
  constructor(private readonly apiService: ApiService) {}

  async generateSignInMessage() {
    const res = await this.apiService.get("/auth/generateSignInMessage");
    return res.data as string;
  }

  async connect(signature: string, message: string, publicKey: string) {
    const res = await this.apiService.post("/auth/connect", {
      signature,
      message,
      publicKey,
    });
    this.apiService.setBearerToken(res.data.access_token);
    return res.data as AuthConnectResponse;
  }
}
