import { useState } from "react";
import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage.tsx";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage.tsx";

function App() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedEmployeeId !== null ? (
        <div>
          <div className="p-8 pb-0">
            <button
              onClick={() => setSelectedEmployeeId(null)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              &larr; Back to directory
            </button>
          </div>
          <EmployeeDetailDetailPage employeeId={selectedEmployeeId} />
        </div>
      ) : (
        <EmployeesPage onViewDetail={setSelectedEmployeeId} />
      )}
    </div>
  );
}

export default App;