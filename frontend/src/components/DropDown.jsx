import React from "react";

export default function Dropdown({
  label,
  options,
  selectedValue,
  handleSort,
}) {
  return (
    <div className="flex items-center gap-3 justify-end pr-12 flex-1 font-primary">
      <label className="text-lg font-bold text-primary dark:text-light">
        {label}
      </label>
      <select
        className="px-4 py-2.5 text-base border-2 rounded-lg transition-smooth border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-cyan-100 dark:focus:ring-cyan-900 focus:outline-none text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 shadow-sm cursor-pointer"
        value={selectedValue}
        onChange={(event) => handleSort(event.target.value)}
      >
        {options.map((optionVal, index) => (
          <option key={index} value={optionVal}>
            {optionVal}
          </option>
        ))}
      </select>
    </div>
  );
}
