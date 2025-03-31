interface SermonFilterProps {
  selectedChurch: string;
  onChurchChange: (church: string) => void;
}

export function SermonFilter({
  selectedChurch,
  onChurchChange
}: SermonFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow">
      <div className="w-full">
        <select
          value={selectedChurch}
          onChange={(e) => onChurchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">모든 교회</option>
          <option value="여의도순복음교회">여의도순복음교회</option>
          <option value="사랑의교회">사랑의교회</option>
          <option value="오륜교회">오륜교회</option>
        </select>
      </div>
    </div>
  );
} 