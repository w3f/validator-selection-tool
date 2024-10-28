import { describe, expect, test } from "vitest"
import { linearInterpolation } from "./linearInterpolation"

describe("linearInterpolation", () => {
  const sortedPoints = [
    { x: 0, y: 5 },
    { x: 5, y: 10 },
    { x: 15, y: 0 },
    { x: 20, y: 10 },
    { x: 26, y: 28 },
  ]

  const interpolate = linearInterpolation(sortedPoints)
  test.each`
    x     | y
    ${-1} | ${5}
    ${1}  | ${6}
    ${4}  | ${9}
    ${5}  | ${10}
    ${10} | ${5}
    ${14} | ${1}
    ${15} | ${0}
    ${16} | ${2}
    ${19} | ${8}
    ${20} | ${10}
    ${21} | ${13}
    ${25} | ${25}
    ${26} | ${28}
    ${27} | ${28}
  `("interpolate($x) => $y", ({ x, y }) => expect(interpolate(x)).toBe(y))
})
