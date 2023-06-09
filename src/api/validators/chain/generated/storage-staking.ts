import { Struct, Vector, bool, compact, u32 } from "scale-ts"
import {
  AccountId,
  storageKeys,
  two64Concat,
} from "@unstoppablejs/substrate-bindings"
import { getFromStorage, getKeys } from "../client"

const staking = storageKeys("Staking")

// Staking.Validators
const validatorsArgs = staking("Validators", two64Concat(AccountId(0).enc))
const validatorsDecoder = Struct({
  commission: compact,
  blocked: bool,
}).dec

export const getStakingValidators = (validator: string) =>
  getFromStorage(validatorsArgs(validator), validatorsDecoder)

// Staking.ErasRewardsPoints
const erasRewardsPointsArgs = staking("ErasRewardPoints", two64Concat(u32.enc))

const e = u32
const b = AccountId(0)
const individual = Vector(Struct({ account: b, points: e }))
const erasRewardsPointsDecoder = Struct({ total: e, individual })

export const getStakingErasRewardsPoints = (era: number) =>
  getFromStorage(erasRewardsPointsArgs(era), erasRewardsPointsDecoder.dec)

// Staking.CurrentEra
const currentEraKey = staking("CurrentEra")()
const currentEraDecoder = u32.dec
export const getStakingCurrentEra = () =>
  getFromStorage(currentEraKey, currentEraDecoder)

// Staking.ActiveEra
const activeEraKey = staking("ActiveEra")()
const activeEraDecoder = u32.dec
export const getStakingActiveEra = () =>
  getFromStorage(activeEraKey, activeEraDecoder)

// Staking.ErasStakers
const erasStakersArgs = staking(
  "ErasStakers",
  two64Concat(u32.enc),
  two64Concat(AccountId(0).enc),
)
const erasStakersDecoder = Struct({
  total: compact,
  own: compact,
}).dec
export const getStakingErasStakers = (era: number, validator: string) =>
  getFromStorage(erasStakersArgs(era, validator), erasStakersDecoder)

// Staking.Nominators
const nominatorsRootKey = staking("Nominators")()
export const stakingNominatorsKeys$ = getKeys(nominatorsRootKey)

const nominatorsDecoder = Struct({
  targets: Vector(AccountId(0)),
  submitted_in: u32,
  suppressed: bool,
}).dec
export const getStakingNominatorsFromKey = (key: string) =>
  getFromStorage(key, nominatorsDecoder)
