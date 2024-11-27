import {
  DotPplWhitelistEntry,
  DotWhitelistEntry,
} from "@polkadot-api/descriptors"

const dotWhitelist: DotWhitelistEntry[] = [
  "query.Staking.*",
  "query.Session.Validators",
]

const pplWhitelist: DotPplWhitelistEntry[] = [
  "query.Identity.IdentityOf",
  "query.Identity.SuperOf",
]

export const whitelist = [...dotWhitelist, ...pplWhitelist]
