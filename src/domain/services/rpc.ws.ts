import { observable } from "micro-observables";
import io, { Socket } from "socket.io-client";
import { UserService } from "./user.service";
import { Transaction } from "./transactions.api";

const rpc_ws_url: string = import.meta.env.VITE_WS_RPC_URL;

export class RpcWS {
  rpc_ws: Socket | undefined;
  userTxsInPool = observable<Transaction[]>([]);

  constructor(private readonly userService: UserService) {
    this.connectRpcWs();
  }

  private connectRpcWs() {
    this.rpc_ws = io(rpc_ws_url);

    this.rpc_ws.on("connect", () => {
      console.log("Connected to server");
    });

    this.rpc_ws.on("tx_pool", this.wsUserPoolTxs.bind(this));
  }

  wsUserPoolTxs(data: { txPool: Transaction[] }) {
    if (!this.userService.userSuiAccount.get()) return;
    const txPool = data.txPool;
    const userAddr = this.userService.userSuiAccount.get()?.address;
    this.userTxsInPool.set(txPool.filter((tx) => tx.from === userAddr));
  }
}
