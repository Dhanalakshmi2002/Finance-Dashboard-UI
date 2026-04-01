type Props = {
  title: string;
  value: number;
};

export const SummaryCard = ({ title, value }: Props) => (
  <div className="p-4 bg-white shadow rounded">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">₹ {value}</p>
  </div>
);
