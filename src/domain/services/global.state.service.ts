import { observable } from "micro-observables";

export class GlobalStateService {
  userPublicKey = observable<string | null>(null);

  constructor() {}
}
