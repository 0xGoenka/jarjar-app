import { UserService } from "./user.service";
import { observable } from "micro-observables";
import { ApiService } from "@/domain/core/api.service";
import io, { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import axios from "axios";

export class TransactionService {
  rpc_ws: Socket | undefined;
  masternode_ws: Socket | undefined;
  userTxsInPool = observable([]);
  userTxsInLedger = observable([]);
  isGenerating = false;
  masternodeWsUrl = "http://localhost:4002";
  result = observable("");

  constructor(
    private readonly apiService: ApiService,
    private readonly userService: UserService
  ) {
    this.apiService = apiService;
    this.connectRpcWs();
    // this.fetchLedgerTxs();
  }

  private connectRpcWs() {
    const rpc_ws_url: string = import.meta.env.VITE_WS_RPC_URL;

    this.rpc_ws = io(rpc_ws_url);

    this.rpc_ws.on("connect", () => {
      console.log("Connected to server");
    });

    this.rpc_ws.on("tx_pool", this.wsUserPoolTxs.bind(this));
  }

  private connectMasternodeWs() {
    const rpc_ws_url: string = import.meta.env.VITE_WS_RPC_URL;

    this.masternode_ws = io(this.masternodeWsUrl);

    this.masternode_ws.on("connect", () => {
      console.log("Connected to server, linking with txId...");
      this.linkTxIdwithClientId("60991854-0bf1-4f84-a8c2-a0b23cfd318dtxId");
    });

    this.masternode_ws.on("disconnect_client", () => {
      console.log("Disconnected from server");
      toast.info("Disconnected from masternode ws");
      this.masternode_ws?.disconnect();
    });

    // this.masternode_ws.on("status", this.listenToMasternodeWs.bind(this));
  }

  private linkTxIdwithClientId(txId: string) {
    this.masternode_ws?.emit("link_txid_with_clientid", txId, (response) => {
      console.log({ responseLinkWithClient: response }); // ok
    });
    this.masternode_ws?.on(
      "stream_response",
      this.processMasternodeResponse.bind(this)
    );
  }

  private disconnectMasternodeWs() {
    if (this.masternode_ws) {
      this.masternode_ws?.disconnect();
    } else {
      toast.error("Disconnect from masternode ws failed, undefined");
    }
  }

  // private listenToMasternodeWs(data) {
  //   console.log({ data });
  //   this.masternode_ws?.on("status", this.processMasternodeResponse.bind(this));
  // }

  private processMasternodeResponse(data) {
    console.log({ data });
    const result = this.result.get();
    this.result.set(result + data.chunk);
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

  async mine({
    to,
    amount,
    generation_input,
  }: {
    to: string;
    amount: number;
    generation_input: object;
  }) {
    const userAccount = this.userService.userSuiAccount.get();
    if (!userAccount) throw new Error("Invalid account");

    try {
      // const mineRes: AxiosResponse = await this.apiService.post(
      //   "/transaction/mine",
      //   {
      //     from: userAccount?.address,
      //     to,
      //     amount,
      //     type: "mine",
      //     generation_input,
      //     metadata: {},
      //   }
      // );
      const mineRes: AxiosResponse = await axios.post(
        "http://localhost:4000/generate",
        {
          generation_input,
          txId: "60991854-0bf1-4f84-a8c2-a0b23cfd318dtxId",
        }
      );
      console.log({ mineRes });
      if (mineRes.data.error)
        return toast.error(mineRes.data.message || "Transaction failed");
      toast.info("Transaction sent!");
      this.connectMasternodeWs();
      this.result.set("");
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  }
}
