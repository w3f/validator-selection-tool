export default function Hero() {
  return (
    <div className="flex flex-col items-start gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mt-0 mb-4">
      <span className="text-h3 font-unbounded">Refine your validator set</span>
      <span className="text-body-2">
        This tool is designed to help you choose the Validators that are better
        suited for your preferences.
        <div className="mb-3" />
        We are going to ask you to decide between a few (5-8) pairs of
        validators and we are going to provide you with a list of suggested
        addresses based on your personal preferences.
      </span>
    </div>
  )
}
