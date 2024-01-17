import { SS58String } from "@polkadot-api/substrate-bindings"
import { client } from "./chain"

export const getComissions = (validators: SS58String[]) =>
  Promise.all(
    validators.map((x) => client.dot.query.Staking.Validators.getValue(x)),
  ).then((validators) =>
    validators.map((v) => v && Math.round(v.commission / 1_000) / 10_000),
  )
