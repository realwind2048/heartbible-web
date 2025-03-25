interface SermonFilterProps {
  selectedChurch: string;
  onChurchChange: (church: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SermonFilter({
  selectedChurch,
  onChurchChange,
  searchTerm,
  onSearchChange
}: SermonFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow">
      <div className="flex-1">
        <input
          type="text"
          placeholder="말씀 제목이나 내용으로 검색..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-48">
        <select
          value={selectedChurch}
          onChange={(e) => onChurchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">모든 교회</option>
          <option value="사랑의교회">사랑의교회</option>
          <option value="온누리교회">온누리교회</option>
          <option value="지구촌교회">지구촌교회</option>
        </select>
      </div>
    </div>
  );
} 