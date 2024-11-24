import { ELECTION_SELECTION } from "../types";

type Props = {
  label: string;
  options: ELECTION_SELECTION[];
  value: string;
  onChange: (value: string) => void;
};

export function SelectElection({ value, onChange, options, label }: Props) {
  return (
    <div className="flex flex-col">
      <label className="" htmlFor="election">
        {label}
      </label>
      <select
        className="relative z-10 p-4 font-light bg-transparent border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed block w-full rounded-md bg-gray border-gray-400 shadow-sm focus:border-black focus:ring-black sm:text-sm placeholder-gray-500 my-2 text-gray-900 form__select-bootcamp"
        name="election"
        id="election"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          Select an election to nominate a representative for...
        </option>
        {options &&
          options.map((value, index) => (
            <option key={index} value={value.name}>
              {value.name} |
            </option>
          ))}
      </select>
    </div>
  );
}
