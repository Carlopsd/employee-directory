import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Employee } from "../../domain/employee.types.ts";

const columnHelper = createColumnHelper<Employee>();

function StatusBadge({ status }: { status: Employee["status"] }) {
  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-sm font-medium ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full ${
          isActive ? "bg-green-500" : "bg-red-400"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

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
    columnHelper.accessor("position", {
      header: "Position",
      meta: { hideOnMobile: true },
    }),
    columnHelper.accessor("department", {
      header: "Department",
      meta: { hideOnMobile: true },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    ...(onViewDetail
      ? [
          columnHelper.display({
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: (info) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetail(info.row.original.id);
                }}
                aria-label={`View ${info.row.original.firstName} ${info.row.original.lastName}`}
                className="rounded px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
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

  if (employees.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center text-sm text-gray-500">
        No employees found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table
        aria-label="Employee directory"
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 ${
                    (header.column.columnDef.meta as { hideOnMobile?: boolean })
                      ?.hideOnMobile
                      ? "hidden sm:table-cell"
                      : ""
                  }`}
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
            <tr
              key={row.id}
              onClick={() =>
                onViewDetail?.(row.original.id)
              }
              className={
                onViewDetail
                  ? "cursor-pointer transition-colors hover:bg-blue-50"
                  : ""
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-6 py-4 text-sm text-gray-900 sm:whitespace-nowrap ${
                    (cell.column.columnDef.meta as { hideOnMobile?: boolean })
                      ?.hideOnMobile
                      ? "hidden sm:table-cell"
                      : ""
                  }`}
                >
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
