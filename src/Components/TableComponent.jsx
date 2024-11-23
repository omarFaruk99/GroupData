import React from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const TableComponent = ({ tableData }) => {
  return (
    <table className="w-full border-collapse border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Logo</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">VAT Number</th>
          <th className="border border-gray-300 px-4 py-2">Active</th>
        </tr>
      </thead>
      <tbody>
        {/* Check if there is any data in the tableData array */}
        {tableData.length > 0 ? (
          // Loop through each row of data and render it in the table
          tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  target="_blank"
                  src={row.logoThumbnailUrl}
                  alt=""
                  className="w-6 h-6"
                />
              </td>
              {/* Render the name */}
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              {/* Render the VAT number */}
              <td className="border border-gray-300 px-4 py-2">
                {row.vatNumber}
              </td>
              {/* Render the active status with icons */}
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.active ? (
                  <span className="flex justify-center">
                    <FaCheck color="green" />
                  </span>
                ) : (
                  <span className="flex justify-center">
                    <RxCross2 color="red" />
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          // If no data is available, display a message
          <tr>
            <td colSpan="5" className="text-center text-gray-500 py-4">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
