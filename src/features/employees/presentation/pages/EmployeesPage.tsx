import { useGetEmployeesQuery } from "../../data/employeesApi.ts";
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

  if (isLoading) return <p className="p-8 text-gray-500">Loading employees…</p>;
  if (error) return <p className="p-8 text-red-600">Failed to load employees.</p>;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <button
          onClick={onAddEmployee}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          + Add Employee
        </button>
      </div>
      <EmployeesTable employees={employees ?? []} onViewDetail={onViewDetail} />
    </div>
  );
}
