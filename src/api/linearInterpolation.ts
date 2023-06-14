const binarySearch = (
  target: number,
  sortedValues: number[],
  fromIdx: number,
  toIdx: number,
): number | [number, number] => {
  if (toIdx - fromIdx === 1) return [fromIdx, toIdx]

  const mid = fromIdx + Math.round((toIdx - fromIdx) / 2)
  const diff = target - sortedValues[mid]
  if (diff === 0) return mid
  return diff > 0
    ? binarySearch(target, sortedValues, mid, toIdx)
    : binarySearch(target, sortedValues, fromIdx, mid)
}

export const linearInterpolation = (
  sortedPoints: Array<{ x: number; y: number }>,
): ((x: number) => number) => {
  const sortedX = sortedPoints.map(({ x }) => x)
  const findLimits = (x: number): number | [number, number] => {
    if (x <= sortedX[0]) return 0
    const lastIdx = sortedX.length - 1
    if (x >= sortedX[lastIdx]) return lastIdx

    return binarySearch(x, sortedX, 0, lastIdx)
  }

  return (x: number) => {
    const limits = findLimits(x)
    if (!Array.isArray(limits)) return sortedPoints[limits].y

    const [fromIdx, toIdx] = limits

    const yDelta = sortedPoints[toIdx].y - sortedPoints[fromIdx].y
    const xDelta = sortedPoints[toIdx].x - sortedPoints[fromIdx].x
    const relativeX = x - sortedPoints[fromIdx].x
    const relativeY = (yDelta * relativeX) / xDelta

    return sortedPoints[fromIdx].y + relativeY
  }
}
