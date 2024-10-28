import {
  DotPplWhitelistEntry,
  DotWhitelistEntry,
} from "@polkadot-api/descriptors"

const dotWhitelist: DotWhitelistEntry[] = [
  "query.Staking.Validators",
  "query.Staking.CurrentEra",
  "query.Staking.ErasRewardPoints",
  "query.Staking.ErasStakers",
  "query.Staking.ActiveEra",
  "query.Staking.Nominators",
  "query.Staking.Validators",
  "query.Session.Validators",
]

const pplWhitelist: DotPplWhitelistEntry[] = [
  "query.Identity.IdentityOf",
  "query.Identity.SuperOf",
]

export const whitelist = [...dotWhitelist, ...pplWhitelist]
