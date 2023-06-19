export default function Hero() {
  return (
    <div className="w-full h-full mb-4 text-foreground-contrast">
      <div className="h-full flex flex-col items-start justify-center pt-4 lg:pt-0 gap-4 pr-6 xl:pr-24 pl-0 lg:pl-6 mb-0 lg:mb-4">
        <span className="text-3xl font-unbounded font-medium">
          Tailor Your Nominations
        </span>
        <span className="text-sm">
          This tool is engineered to streamline your nominations based on your
          preferences, using the most up-to-date validator data.
          <br />
          <br />
          Your role involves making decisions between pairs of validators
          (typically 5-8), enabling the algorithm to learn from your choices.
          <br />
          <br />
          Upon conclusion, you'll be provided a list of top-ranking validators
          matching your preferences. You'll have the flexibility to adjust these
          recommendations before exporting as per your requirement.
          <br />
          <br />
          To start, make your first selection between the validators presented.
        </span>
      </div>
    </div>
  )
}
