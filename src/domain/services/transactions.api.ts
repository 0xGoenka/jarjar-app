import { ApiService } from "../core/api.service";

export enum E_TransactionType {
  pay = "pay",
  mine = "mine",
  bridge = "bridge",
}

export type Transaction = {
  txId: string;
  from: string;
  to: string;
  amount: number;
  type: E_TransactionType;
  generation_input: object;
  metadata: object;
  private_metadata: object;
};

export class TransactionApi {
  constructor(private readonly apiService: ApiService) {}

  async pay(from: string, to: string, amount: number) {
    const res = await this.apiService.post("/transaction/pay", {
      from,
      to,
      amount,
      type: E_TransactionType.pay,
    });
    return res.data as { error: boolean; message: string };
  }

  async mine(
    from: string,
    to: string,
    amount: number,
    generation_input: object
  ) {
    const res = await this.apiService.post("/transaction/mine", {
      from,
      to,
      amount,
      generation_input,
      type: E_TransactionType.mine,
      metadata: {},
    });
    return res.data as { error: boolean; message: string; txId: string };
  }

  async getUserTxHistory(address: string) {
    const res = await this.apiService.get(
      "/transaction/ledger/from/" + address
    );
    return res.data as Transaction[];
  }
}
