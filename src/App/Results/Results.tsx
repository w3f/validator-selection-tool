import { onReset, resultsState$, ResultsState } from "@/state"
import { Subscribe, useStateObservable } from "@react-rxjs/core"
import { Loading } from "@/Components/Loading"
import Button from "@/Components/Button"
import { Table } from "./Table"
import { Selected } from "./Selected"
import { Copy } from "./Copy"

const Reset: React.FC = () => {
  return (
    <Button variant="ghost" small secondary onClick={() => onReset()}>
      Reset
    </Button>
  )
}

export default function Results() {
  const resultsState = useStateObservable(resultsState$)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      className="w-full flex flex-col gap-0 pb-4 transition-all"
    >
      <div className="sticky top-[-2px] flex flex-col gap-2 text-foreground-contrast bg-background-default pb-6">
        <div className="h-fit flex items-center justify-between ">
          <span className="text-lg md:text-xl leading-8 font-unbounded">
            Results
          </span>
          <div className="gap-4 hidden md:flex">
            <Reset />
            {resultsState > ResultsState.INSUFICIENT && <Copy />}
          </div>
        </div>
        <div className="flex gap-1.5 items-center text-sm">
          <span>Precision:</span>
          {resultsState === ResultsState.INSUFICIENT && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full  bg-orange-400" />
              <span className="font-semibold text-orange-400">Low</span>
            </div>
          )}
          {resultsState === ResultsState.GOOD_ENOUGH && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full  bg-green-500" />
              <span className="text-green-500 font-semibold">Good enough</span>
            </div>
          )}
          {resultsState === ResultsState.PERFECT && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full  bg-green-600" />
              <span className="text-green-600 font-semibold">Perfect</span>
            </div>
          )}
          <Selected />
        </div>
      </div>
      <Subscribe fallback={<Loading size={16} />}>
        <Table />
        {resultsState > ResultsState.INSUFICIENT && (
          <div className="w-full absolute drop-shadow-[0_-2px_6px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_-2px_6px_rgba(0,0,0,0.4)]  bottom-0 gap-4 h-fit px-4 py-6 bg-background-default left-0 justify-between flex md:hidden">
            <Reset />
            <Copy />
          </div>
        )}
      </Subscribe>
    </form>
  )
}
