import { ApiService } from "./../core/api.service";
import { observable } from "micro-observables";
import { toast } from "react-toastify";

export class UserService {
  userSuiAccount = observable<any>(null);
  signFn: any;

  constructor(private readonly apiService: ApiService) {
    this.userSuiAccount.subscribe((account) => {
      if (account) {
        this.connect(this.signFn, account);
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

  async connect() {
    const userAccount = this.userSuiAccount.get();
    if (!userAccount) throw new Error("Invalid account");

    try {
      const message = await this.apiService.get("/auth/generateSignInMessage");
      console.log({ message });
      const signature = await this.signPersonalMessage(message.data as string);
      console.log({ signature });
      // below should return token and access to the app / wallet
      const data = await this.apiService.post("/auth/connect", {
        signature,
        message: message.data,
        publicKey: userAccount?.address || "",
      });
      console.log({ data });
      toast.success("Ownership Approved!");
    } catch (e) {
      toast.error(e.toString());
    }
  }
}
