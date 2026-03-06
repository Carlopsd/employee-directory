import { useMemo, useState } from "react";
import {
  useGetEmployeesQuery,
  useGetDepartmentsQuery,
} from "../../data/employeesApi.ts";
import EmployeesTable from "../components/EmployeesTable.tsx";

interface EmployeesPageProps {
  onViewDetail?: (employeeId: number) => void;
  onAddEmployee?: () => void;
}

export default function EmployeesPage({
  onViewDetail,
  onAddEmployee,
}: EmployeesPageProps) {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    const query = searchQuery.toLowerCase();
    return employees.filter((e) => {
      const matchesDepartment =
        selectedDepartment === "All" || e.department === selectedDepartment;
      const matchesSearch =
        query === "" ||
        e.firstName.toLowerCase().includes(query) ||
        e.lastName.toLowerCase().includes(query);
      return matchesDepartment && matchesSearch;
    });
  }, [employees, selectedDepartment, searchQuery]);


  if (isLoading)
    return (
      <p role="status" aria-live="polite" className="p-8 text-gray-500">
        Loading employees…
      </p>
    );
  if (error) return <p role="alert" className="p-8 text-red-600">Failed to load employees.</p>;

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
        <button
          onClick={onAddEmployee}
          className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none"
        >
          + Add Employee
        </button>
      </div>
      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center">
          <label htmlFor="search-filter" className="whitespace-nowrap text-sm font-medium text-gray-700 sm:mr-2">
            Search
          </label>
          <input
            id="search-filter"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:w-48 sm:text-sm"
          />
        </div>
        <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center">
          <label htmlFor="department-filter" className="whitespace-nowrap text-sm font-medium text-gray-700 sm:mr-2">
            Department
          </label>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:w-auto sm:text-sm"
          >
            <option value="All">All</option>
            {departments?.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <EmployeesTable employees={filteredEmployees} onViewDetail={onViewDetail} />
    </div>
  );
}
