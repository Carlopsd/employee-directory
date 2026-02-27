import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Employee } from "../../domain/employee.types.ts";

const columnHelper = createColumnHelper<Employee>();

interface EmployeesTableProps {
  employees: Employee[];
  onViewDetail?: (employeeId: number) => void;
}

export default function EmployeesTable({
  employees,
  onViewDetail,
}: EmployeesTableProps) {
  const columns = [
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      id: "name",
      header: "Name",
    }),
    columnHelper.accessor("position", { header: "Position" }),
    columnHelper.accessor("department", { header: "Department" }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {status}
          </span>
        );
      },
    }),
    ...(onViewDetail
      ? [
          columnHelper.display({
            id: "actions",
            header: "",
            cell: (info) => (
              <button
                onClick={() => onViewDetail(info.row.original.id)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View
              </button>
            ),
          }),
        ]
      : []),
  ];

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
