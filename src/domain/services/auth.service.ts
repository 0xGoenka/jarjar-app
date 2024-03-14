import { observable } from "micro-observables";
import { toast } from "react-toastify";
import { AuthApi } from "./auth.api";
import type { WalletAccount } from "@mysten/wallet-standard";

export class AuthService {
  signFn:
    | undefined
    | ((
        params: object,
        callbacks: {
          onSuccess: (result: { signature: string }) => void;
          onError: (error: Error) => void;
        }
      ) => Promise<void>);

  bearerToken: string | null = null;
  isConnectedToJarJarRpc = observable(false);
  constructor(private readonly authApi: AuthApi) {
    const bearerFromStorage = localStorage.getItem("access_token");
    if (bearerFromStorage) {
      this.authApi.setBearerToken(bearerFromStorage);
      this.isConnectedToJarJarRpc.set(true);
    }
  }

  async signPersonalMessage(messageStr: string) {
    if (!this.signFn) throw new Error("Invalid sign function");
    const message = new TextEncoder().encode(messageStr);
    const signPromise: Promise<string> = new Promise((resolve, reject) => {
      this.signFn?.(
        {
          message,
        },
        {
          onSuccess: (result: { signature: string }) =>
            resolve(result.signature),
          onError: (error: Error) => reject(error),
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
      const connect = await this.authApi.connect(signature, message, publicKey);
      this.bearerToken = connect.access_token;
      this.isConnectedToJarJarRpc.set(true);
      toast.success("Ownership Approved!");
      return connect;
    } catch (e) {
      toast.error(e.toString());
    }
  }
}
