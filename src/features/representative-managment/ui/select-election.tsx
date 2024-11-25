type Props = {
  label: string;
  options: { name: string; id: number }[];
  value: { name: string; id: number } | null;
  onChange: (value: { name: string; id: number }) => void;
};

export function SelectElection({ value, onChange, options, label }: Props) {
  return (
    <div>
      <label
        htmlFor="election"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        className="relative z-10 p-4 font-light bg-transparent border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed block w-full rounded-md bg-gray border-gray-400 shadow-sm focus:border-black focus:ring-black sm:text-sm placeholder-gray-500 my-2 text-gray-900 form__select-bootcamp"
        name="election"
        id="election"
        value={value?.id || ""}
        onChange={(e) => {
          const selectedOption = options.find(
            (option) => option.id === Number(e.target.value)
          );
          if (selectedOption) {
            onChange(selectedOption);
          }
        }}
      >
        <option value="">
          Select an election to nominate a representative for...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
