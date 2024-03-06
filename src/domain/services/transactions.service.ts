import { UserService } from "./user.service";
import { observable } from "micro-observables";
import { ApiService } from "@/domain/core/api.service";
import io, { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export class TransactionService {
  ws: Socket | undefined;
  userTxsInPool = observable([]);
  userTxsInLedger = observable([]);

  constructor(
    private readonly apiService: ApiService,
    private readonly userService: UserService
  ) {
    this.apiService = apiService;
    this.connectWs();
    // this.fetchLedgerTxs();
  }

  private connectWs() {
    const rpc_ws_url: string = import.meta.env.VITE_WS_RPC_URL;

    this.ws = io(rpc_ws_url);

    this.ws.on("connect", () => {
      console.log("Connected to server");
    });

    this.ws.on("tx_pool", this.wsUserPoolTxs.bind(this));
  }

  wsUserPoolTxs(data) {
    if (!this.userService.userSuiAccount.get()) return;
    const userAddr = this.userService.userSuiAccount.get()?.address;
    this.userTxsInPool.set(data.txPool.filter((tx) => tx.from === userAddr));
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

  async pay({ to, amount }: { to: string; amount: number }) {
    const userAccount = this.userService.userSuiAccount.get();
    if (!userAccount) throw new Error("Invalid account");

    try {
      const payRes: AxiosResponse = await this.apiService.post(
        "/transaction/pay",
        {
          from: userAccount?.address,
          to,
          amount,
          type: "pay",
        }
      );
      console.log({ payRes });
      if (payRes.data.error)
        return toast.error(payRes.data.message || "Transaction failed");
      toast.info("Transaction sent!");
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  }
}
