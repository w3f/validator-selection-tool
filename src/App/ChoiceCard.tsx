import { ValidatorChoice } from "@/api"
import { loading } from "./Loading"

const Field: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {children === undefined ? loading : children}
      </dd>
    </div>
  )
}

export const ChoiceCard: React.FC<{
  data?: ValidatorChoice["values"]
  onSelect: () => void
  title: string
}> = ({ data, onSelect, title }) => {
  const { clusterSize, comission, eraPoints, selfStake, totalStake, voters } =
    data ?? {}
  return (
    <div
      className="overflow-hidden bg-white shadow sm:rounded-lg"
      onClick={onSelect}
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {title || loading}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <Field title="Cluster Size">{clusterSize}</Field>
          <Field title="Comission">{comission}</Field>
          <Field title="Era Points">{eraPoints}</Field>
          <Field title="Total Stake">{totalStake}</Field>
          <Field title="Self Stake">{selfStake}</Field>
          <Field title="Voters">{voters}</Field>
        </dl>
      </div>
    </div>
  )
}
