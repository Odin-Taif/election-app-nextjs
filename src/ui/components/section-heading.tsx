type IconTextCardProps = {
  title: string;
  icon: React.ReactNode; // This allows any React element to be passed as an icon
};

export function SectionHeading({ title, icon }: IconTextCardProps) {
  return (
    <div className="my-2 flex flex-row text-left items-left border-b border-b-gray-200">
      <div className="mr-2">{icon}</div>
      <h5 className="text-lg mx-2 font-semibold text-gray-800">{title}</h5>
    </div>
  );
}
