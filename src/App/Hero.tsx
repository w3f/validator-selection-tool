export function Hero() {
  return (
    <div className="w-full h-full mb-3 md:mb-4 text-foreground-contrast">
      <div className="h-full text-sm flex flex-col items-start justify-center pt-4 lg:pt-0 gap-10 pr-6 xl:pr-24 pl-0 lg:pl-6 mb-0 lg:mb-4">
        <div className="flex flex-col gap-1 md:gap-1.5">
          <span className="text-lg font-unbounded font-medium">
            Tailor Your Nominations
          </span>
          <span className="text-base">
            This tool is engineered to streamline your nominations based on your
            preferences, using the most up-to-date validator data.
          </span>
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <span>
            Pick between pairs of validators (5-8 pairs), and enable the
            algorithm to learn from your choices.
          </span>
          <span>
            Upon conclusion, you'll be provided a list of top-ranking validators
            matching your preferences. You'll have the flexibility to adjust
            these recommendations before exporting them.
          </span>
          <span className="font-medium">
            To start, make your first selection between the validators
            presented!
          </span>
          <span className="font-medium">
            Feel free to give feedback by sending an email to{" "}
            <a className="text-red-600" href="mailto:jonas@web3.foundation">
              jonas@web3.foundation
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
