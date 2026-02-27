import { useState } from "react";
import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage.tsx";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage.tsx";
import EmployeeCreateForm from "./features/employees/presentation/components/EmployeeCreateForm.tsx";

type View =
  | { kind: "list" }
  | { kind: "detail"; employeeId: number }
  | { kind: "create" };

function App() {
  const [view, setView] = useState<View>({ kind: "list" });

  return (
    <div className="min-h-screen bg-gray-50">
      {view.kind === "detail" ? (
        <div>
          <div className="p-8 pb-0">
            <button
              onClick={() => setView({ kind: "list" })}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              &larr; Back to directory
            </button>
          </div>
          <EmployeeDetailDetailPage employeeId={view.employeeId} />
        </div>
      ) : view.kind === "create" ? (
        <div className="p-8">
          <button
            onClick={() => setView({ kind: "list" })}
            className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            &larr; Back to directory
          </button>
          <h1 className="mb-6 text-2xl font-bold">Add New Employee</h1>
          <EmployeeCreateForm />
        </div>
      ) : (
        <EmployeesPage
          onViewDetail={(id) => setView({ kind: "detail", employeeId: id })}
          onAddEmployee={() => setView({ kind: "create" })}
        />
      )}
    </div>
  );
}

export default App;