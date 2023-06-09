import { Enum, Struct, Tuple, Vector, _void, u128, u32, u8 } from "scale-ts"
import {
  AccountId,
  blake2128Concat,
  storageKeys,
  two64Concat,
} from "@unstoppablejs/substrate-bindings"
import { getFromStorage } from "../client"

const identity = storageKeys("Identity")

// Identity.IdentityOf
const identityOfArgs = identity("IdentityOf", two64Concat(AccountId(0).enc))

const b = AccountId(0)
const e = u32
const g = u128
const fm = Enum({
  Unknown: _void,
  FeePaid: g,
  Reasonable: _void,
  KnownGood: _void,
  OutOfDate: _void,
  LowQuality: _void,
  Erroneous: _void,
})
const uw = Tuple(e, fm)
const vw = Vector(uw)
const tw = vw
const c = u8
const vk = Vector(c, 0)
const wk = Vector(c, 1)
const xk = Vector(c, 2)
const yk = Vector(c, 3)
const q = Vector(c, 4)
const al = Vector(c, 5)
const bl = Vector(c, 6)
const cl = Vector(c, 7)
const rf = Vector(c, 8)
const dl = Vector(c, 9)
const el = Vector(c, 10)
const fl = Vector(c, 11)
const gl = Vector(c, 12)
const hl = Vector(c, 13)
const il = Vector(c, 14)
const jl = Vector(c, 15)
const vb = Vector(c, 16)
const kl = Vector(c, 17)
const ll = Vector(c, 18)
const ml = Vector(c, 19)
const ad = Vector(c, 20)
const nl = Vector(c, 21)
const ol = Vector(c, 22)
const pl = Vector(c, 23)
const ql = Vector(c, 24)
const rl = Vector(c, 25)
const sl = Vector(c, 26)
const tl = Vector(c, 27)
const ul = Vector(c, 28)
const vl = Vector(c, 29)
const wl = Vector(c, 30)
const xl = Vector(c, 31)
const uk = Enum({
  None: _void,
  Raw0: vk,
  Raw1: wk,
  Raw2: xk,
  Raw3: yk,
  Raw4: q,
  Raw5: al,
  Raw6: bl,
  Raw7: cl,
  Raw8: rf,
  Raw9: dl,
  Raw10: el,
  Raw11: fl,
  Raw12: gl,
  Raw13: hl,
  Raw14: il,
  Raw15: jl,
  Raw16: vb,
  Raw17: kl,
  Raw18: ll,
  Raw19: ml,
  Raw20: ad,
  Raw21: nl,
  Raw22: ol,
  Raw23: pl,
  Raw24: ql,
  Raw25: rl,
  Raw26: sl,
  Raw27: tl,
  Raw28: ul,
  Raw29: vl,
  Raw30: wl,
  Raw31: xl,
  Raw32: b,
  BlakeTwo256: b,
  Sha256: b,
  Keccak256: b,
  ShaThree256: b,
})
const tk = Tuple(uk, uk)
const yl = Vector(tk)
const sk = yl
const am = Enum({ None: _void, Some: ad })
const rk = Struct({
  additional: sk,
  display: uk,
  legal: uk,
  web: uk,
  riot: uk,
  email: uk,
  pgp_fingerprint: am,
  image: uk,
  twitter: uk,
})

const identityOfDecoder = Struct({ judgements: tw, deposit: g, info: rk }).dec

export const getIdentityIdentityOf = (validator: string) =>
  getFromStorage(identityOfArgs(validator), identityOfDecoder)

// Identity.SuperOf
const superOfArgs = identity("SuperOf", blake2128Concat(b.enc))
const superOfDecoder = b.dec
export const getIdentitySuperOf = (validator: string) =>
  getFromStorage(superOfArgs(validator), superOfDecoder)
