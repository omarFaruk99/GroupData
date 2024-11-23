import React from "react";

const GroupListFilter = ({
  groupName,
  setGroupName,
  vatNumber,
  setVatNumber,
  activeOption,
  setActiveOption,
  activeOptions,
  onSearch,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 border rounded-md p-4 border-gray-300">
      {/* Input field for the "Group Name" filter */}
      <div className="flex flex-col w-full sm:w-1/3">
        <label htmlFor="groupName" className="mb-2 font-medium">
          Group Name
        </label>
        <input
          type="text"
          id="groupName"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Input field for the "VAT Number" filter */}
      <div className="flex flex-col w-full sm:w-1/3">
        <label htmlFor="vatNumber" className="mb-2 font-medium">
          VAT Number
        </label>
        <input
          type="text"
          id="vatNumber"
          placeholder="VAT number"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Dropdown for the "Active Option" filter */}
      <div className="flex flex-col w-full sm:w-1/4">
        <label htmlFor="activeOption" className="mb-2 font-medium">
          Active Option
        </label>
        <select
          id="activeOption"
          value={activeOption}
          onChange={(e) => setActiveOption(e.target.value)} // Update state on selection change
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          {activeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      {/* Search button to trigger the onSearch function */}
      <div className="flex items-center justify-center w-full">
        <button
          onClick={onSearch}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default GroupListFilter;
