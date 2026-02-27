import { useState } from "react";
import {
  useGetEmployeeDetailByIdQuery,
  useUpdateEmployeeDetailMutation,
} from "../../data/employee-detailApi.ts";
import EmployeeDetailForm from "../components/EmployeeDetailForm.tsx";

interface EmployeeDetailDetailPageProps {
  employeeId: number;
}

export default function EmployeeDetailDetailPage({
  employeeId,
}: EmployeeDetailDetailPageProps) {
  const {
    data: employee,
    isLoading,
    error,
  } = useGetEmployeeDetailByIdQuery(employeeId);
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeDetailMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (isLoading)
    return <p className="p-8 text-gray-500">Loading employee…</p>;
  if (error || !employee)
    return <p className="p-8 text-red-600">Failed to load employee.</p>;

  const handleSubmit = async (data: Omit<typeof employee, "id">) => {
    try {
      await updateEmployee({ id: employee.id, ...data }).unwrap();
      setSuccessMessage("Employee updated successfully.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      /* error handled by RTK Query */
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-2xl font-bold">
        {employee.firstName} {employee.lastName}
      </h1>

      {successMessage && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <EmployeeDetailForm
          employee={employee}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
}
