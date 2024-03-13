import { UserService } from "./user.service";
import { observable } from "micro-observables";
import { ApiService } from "@/domain/core/api.service";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { MasternodeWS } from "./masternode.ws";
import { TransactionApi } from "./transactions.api";

export type T_Mine = {
  to: string;
  amount: number;
  generation_input: object;
};

export type T_Pay = {
  to: string;
  amount: number;
};

export class TransactionService {
  rpc_ws: Socket | undefined;
  userTxsInLedger = observable([]);

  constructor(
    private readonly apiService: ApiService,
    private readonly userService: UserService,
    private readonly masternodeWs: MasternodeWS,
    private readonly transactionApi: TransactionApi
  ) {
    this.apiService = apiService;
  }

  async fetchUserLedgerTxs() {
    const userAccount = this.userService.userSuiAccount.get();

    try {
      const response = await this.apiService.get(
        "/transaction/ledger/from/" + userAccount?.address
      );
      console.log(response);
      if (typeof response.data === "object")
        this.userTxsInLedger.set(response.data as any);
    } catch (error) {
      console.error(error);
    }
  }

  async pay({ to, amount }: T_Pay) {
    const userAccount = this.userService.userSuiAccount.get();
    if (!userAccount) throw new Error("Invalid account");

    try {
      const pay = await this.transactionApi.pay(
        userAccount.address,
        to,
        amount
      );
      if (pay.error) return toast.error(pay.message);
      toast.info("Transaction sent successfully!");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error(e.message);
      } else {
        console.error(e);
        toast.error("An unexpected error occurred");
      }
    }
  }

  async mine({ to, amount, generation_input }: T_Mine) {
    const userAccount = this.userService.userSuiAccount.get();
    if (!userAccount) throw new Error("Invalid account");

    try {
      const mine = await this.transactionApi.mine(
        userAccount.address,
        to,
        amount,
        generation_input
      );
      if (mine.error) return toast.error(mine.message || "Transaction failed");
      toast.info("Transaction sent!");
      this.masternodeWs.connect(mine.txId);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error(e.message);
      } else {
        console.error(e);
        toast.error("An unexpected error occurred");
      }
    }
  }
}
