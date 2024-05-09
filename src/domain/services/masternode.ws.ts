import io, { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { observable } from "micro-observables";

export class MasternodeWS {
  masternode_ws: Socket | undefined;
  isGenerating = observable(false);
  result = observable("");

  constructor() {}

  connect(txId: string, url: string) {
    this.masternode_ws = io(url);
    this.result.set("");

    this.masternode_ws.on("connect", () => {
      console.log("Connected to masternode, linking with txId...");
      this.linkTxIdwithClientId(txId);
    });

    this.masternode_ws.on("disconnect_client", () => {
      console.log("Disconnected from server");
      toast.info("Disconnected from masternode ws");
      this.masternode_ws?.disconnect();
      this.isGenerating.set(false);
    });

    this.masternode_ws.on("status", (e) => {
      console.log({ e });
    });

    // this.masternode_ws.on("status", this.listenToMasternodeWs.bind(this));
  }

  private linkTxIdwithClientId(txId: string) {
    this.isGenerating.set(true);
    if (this.masternode_ws === undefined) throw new Error("WS not connected");

    this.masternode_ws.emit("link_txid_with_clientid", txId);
    this.masternode_ws.on(
      "stream_response",
      this.processMasternodeResponse.bind(this)
    );
  }

  private processMasternodeResponse(data: { chunk: string }) {
    console.log({ data });
    const result = this.result.get();
    this.result.set(result + data.chunk);
  }
}
