import { Fragment } from "react"
import { Dialog as BaseDialog, Transition } from "@headlessui/react"
import { latestQuality$, onSeeResults } from "@/state"
import { filter, map, startWith, switchMap, take } from "rxjs"
import { createSignal } from "@react-rxjs/utils"
import { StateObservable, useStateObservable } from "@react-rxjs/core"

enum DialogState {
  INIT = 0,
  INSUFICIENT = 1,
  GOOD_ENOUGH = 2,
  PERFECT = 3,
}

const dialogState$: StateObservable<DialogState> = latestQuality$.pipeState(
  map((x) => {
    if (x === 0) return DialogState.INIT
    if (x < 0.7) return DialogState.INSUFICIENT
    return x > 0.85 ? DialogState.PERFECT : DialogState.GOOD_ENOUGH
  }),
)

const [ack$, onUserAck] = createSignal<void>()

const isVisible$ = dialogState$.pipeState(
  filter((x) => x !== DialogState.INSUFICIENT),
  switchMap(() => {
    return ack$.pipe(
      map(() => false),
      startWith(true),
      take(2),
    )
  }),
)

isVisible$.subscribe()

const data$: StateObservable<readonly [string, string, React.ReactNode]> =
  dialogState$.pipeState(
    map((state) => {
      if (state === DialogState.INSUFICIENT) return ["", "", <></>] as const
      if (state === DialogState.INIT)
        return [
          "Welcome!",
          "This tool is designed to help you choose the Validators that are better suited for your preferences. We are going to ask you to decide between a few (5-8) pairs of validators and we are going to provide you with a list of suggested validators based on your personal preferences.",
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => onUserAck()}
            >
              Get Started
            </button>
          </div>,
        ] as const

      if (state === DialogState.GOOD_ENOUGH)
        return [
          "We have enough data!",
          "With the answers that you have provided so far, we have enough information to give you a list of suggested Validators. However, we could curate that list even further if you were willing to respond to a couple more comparissons. So, it's up to you :-).",
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              onClick={() => {
                onSeeResults()
                onUserAck()
              }}
            >
              See the results!
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onClick={() => {
                onUserAck()
              }}
            >
              More comparissons
            </button>
          </div>,
        ] as const

      return [
        "Awesome!",
        "With the answer that you've provided we feel very confident that we will be able to provide you with a very curated list of validators.",
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              onSeeResults()
              onUserAck()
            }}
          >
            See the results
          </button>
        </div>,
      ] as const
    }),
  )

data$.subscribe()

export const Dialog: React.FC = () => {
  const isVisible = useStateObservable(isVisible$)
  const [title, text, buttons] = useStateObservable(data$)

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <BaseDialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <BaseDialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <BaseDialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </BaseDialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{text}</p>
                    </div>
                  </div>
                </div>
                {buttons}
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition.Root>
  )
}
