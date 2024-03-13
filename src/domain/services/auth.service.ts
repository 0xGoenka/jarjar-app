import { Observable, WritableObservable, observable } from "micro-observables";
import { toast } from "react-toastify";
import { AuthApi } from "./auth.api";
import type { WalletAccount } from "@mysten/wallet-standard";

export class AuthService {
  signFn: any;
  bearerToken: string | null = null;
  isConnectedToJarJarRpc = observable(false);
  account: WritableObservable<null | object> = observable(null);
  constructor(private readonly authApi: AuthApi) {}

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

  async connect(userSuiAccount: WalletAccount | null) {
    if (!userSuiAccount) throw new Error("Invalid account");

    try {
      const message = await this.authApi.generateSignInMessage();
      const signature = await this.signPersonalMessage(message as string);
      const publicKey = userSuiAccount.address;
      // below should return token and access to the app / wallet
      const connectRes = await this.authApi.connect(
        signature,
        message,
        publicKey
      );
      this.bearerToken = connectRes.access_token;
      this.account.set(connectRes.account);
      this.isConnectedToJarJarRpc.set(true);
      toast.success("Ownership Approved!");
    } catch (e) {
      toast.error(e.toString());
    }
  }
}
