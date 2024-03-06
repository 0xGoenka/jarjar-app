import { WritableObservable, observable } from "micro-observables";
import { ApiService } from "@/domain/core/api.service";
import io, { Socket } from "socket.io-client";

export class TransactionService {
  private apiService: ApiService;
  public ledger_txs: WritableObservable<any> = observable([]);
  public pooled_txs: WritableObservable<any> = observable([]);
  ws: Socket | undefined;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
    // this.connectWs();
    // this.fetchLedgerTxs();
  }

  private connectWs() {
    const rpc_ws_url: string = import.meta.env.VITE_WS_RPC_URL;

    this.ws = io(rpc_ws_url);

    this.ws.on("connect", () => {
      console.log("Connected to server");
    });

    this.ws.on("tx_pool", (data) => {
      console.log(`tx_pool update: ${data}`, JSON.stringify(data));
      // @TODO: optimize by only updating the new txs
      this.pooled_txs.set(data.txPool);
    });
  }

  async fetchLedgerTxs() {
    try {
      const response = await this.apiService.get(
        "/explorer/ledger_transactions"
      );
      this.ledger_txs.set(response.data as any);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchPooledTxs() {
    try {
      const response = await this.apiService.get(
        "/explorer/pooled_transactions"
      );
      this.pooled_txs.set(response.data as any);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
