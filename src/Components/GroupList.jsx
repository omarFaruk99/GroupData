import { useState, useEffect } from "react";
import axios from "axios";
import GroupListFilter from "./GroupListFilter";
import TableComponent from "./TableComponent";

const GroupList = () => {
  // State to hold filter input values
  const [groupName, setGroupName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [activeOption, setActiveOption] = useState("0");
  const [pageSize, setPageSize] = useState("25");
  const [page, setPage] = useState(1);

   // State for table data and related configurations
  const [groupListResponse, setGroupListResponse] = useState({});
  const [tableData, setTableData] = useState([]);
  const [activeOptions, setActiveOptions] = useState([]);
  const [pageSizes, setPageSizes] = useState([]);

   // Fetch initial data on component load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          "http://119.40.87.9:5000/api/Group/List",
          {
            headers: {
              accept: "*/*",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiQWRtaW5BY2Nlc3MiOnRydWUsImFwcF9tZXRhZGF0YSI6IiIsImV4cCI6MTczNDA2ODA2OCwiaXNzIjoiR2VuUE9TIn0.hJRpOz-LTapjw97NfuoLpYjBDzck2yyX_7KNeu3rm74",
            },
          }
        );

        const data = response.data.data;

        // Save fetched data into states
        setGroupListResponse(data);
        setActiveOptions(data.availableActiveOptions || []);
        setPageSizes(data.availablePageSizes || []);

        const payload = {
          availablePageSizes: data.availablePageSizes || [],
          draw: data.draw || null,
          start: data.start || 0,
          length: data.pageSize || 25,
          searchGroupName: data.searchGroupName || groupName,
          searchVatNumber: data.searchVatNumber || vatNumber,
          searchActiveId: data.searchActiveId || activeOption,
          availableActiveOptions: data.availableActiveOptions || [],
        };

        fetchTableData(payload);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Function to fetch table data based on filters and pagination
  const fetchTableData = async (payload) => {
    try {
      const response = await axios.post(
        "http://119.40.87.9:5000/api/Group/List",
        payload,
        {
          headers: {
            accept: "*/*",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiQWRtaW5BY2Nlc3MiOnRydWUsImFwcF9tZXRhZGF0YSI6IiIsImV4cCI6MTczNDA2ODA2OCwiaXNzIjoiR2VuUE9TIn0.hJRpOz-LTapjw97NfuoLpYjBDzck2yyX_7KNeu3rm74",
          },
        }
      );

      // Save fetched table data
      setTableData(response?.data?.data?.data || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  // Handle search button click to fetch data with current filters
  const handleSearch = () => {
    const payload = {
      availablePageSizes: groupListResponse.availablePageSizes || [],
      draw: groupListResponse.draw || null,
      start: groupListResponse.start || 0,
      length: groupListResponse.pageSize || 25,
      searchGroupName: groupListResponse.searchGroupName || groupName,
      searchVatNumber: groupListResponse.searchVatNumber || vatNumber,
      searchActiveId: groupListResponse.searchActiveId || activeOption,
      availableActiveOptions: groupListResponse.availableActiveOptions || [],
    };
    fetchTableData(payload);
  };

 
  const handlePageChange = (newPage) => {
    setPage(newPage);
    const payload = {
      searchGroupName: groupName,
      searchVatNumber: vatNumber,
      searchActiveId: activeOption,
      length: pageSize,
      start: (newPage - 1) * pageSize,
    };
    fetchTableData(payload);
  };

  console.log(" groupListResponse:>> ", groupListResponse);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">List of Groups</h1>
      <GroupListFilter
        groupName={groupName}
        setGroupName={setGroupName}
        vatNumber={vatNumber}
        setVatNumber={setVatNumber}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        activeOptions={activeOptions}
        onSearch={handleSearch}
      />
      <TableComponent tableData={tableData} />
      <div className="flex items-center justify-between mt-4">
        <div>
          <label htmlFor="pageSize" className="mr-2">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              const newPageSize = e.target.value;
              setPageSize(newPageSize);
              setPage(1); // Reset to first page
              const payload = {
                searchGroupName: groupName,
                searchVatNumber: vatNumber,
                searchActiveId: activeOption,
                length: newPageSize,
                start: 0, // Always start from the first row
              };
              fetchTableData(payload);
            }}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-3">Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
