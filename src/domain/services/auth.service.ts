import { observable } from "micro-observables";
import { ApiService } from "../core/api.service";
import { toast } from "react-toastify";

export class AuthService {
  signFn: any;
  bearerToken: string | null = null;
  isConnectedToJarJarRpc = observable(false);
  constructor(private readonly apiService: ApiService) {}

  async signPersonalMessage(messageStr: string) {
    if (!this.signFn) throw new Error("Invalid sign function");
    const message = new TextEncoder().encode(messageStr);
    const signPromise: Promise<string> = new Promise((resolve, reject) => {
      this.signFn(
        {
          message,
        },
        {
          onSuccess: (result: any) => resolve(result.signature),
          onError: (error: any) => reject(error),
        }
      );
    });
    const signature = await signPromise;
    return signature;
  }

  async connect(userSuiAccount: any) {
    if (!userSuiAccount) throw new Error("Invalid account");

    try {
      const message = await this.apiService.get("/auth/generateSignInMessage");
      console.log({ message });
      const signature = await this.signPersonalMessage(message.data as string);
      console.log({ signature });
      // below should return token and access to the app / wallet
      const connectRes = await this.apiService.post("/auth/connect", {
        signature,
        message: message.data,
        publicKey: userSuiAccount?.address || "",
      });
      this.bearerToken = connectRes.data.access_token;
      this.apiService.setBearerToken(this.bearerToken);
      this.isConnectedToJarJarRpc.set(true);
      toast.success("Ownership Approved!");
    } catch (e) {
      toast.error(e.toString());
    }
  }
}
