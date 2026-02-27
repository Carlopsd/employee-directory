import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { EmployeeDetail } from "../../domain/employee-detail.types.ts";

const columnHelper = createColumnHelper<EmployeeDetail>();

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("position", { header: "Position" }),
  columnHelper.accessor("department", { header: "Department" }),
  columnHelper.accessor("startDate", { header: "Start Date" }),
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
];

interface EmployeeDetailTableProps {
  employees: EmployeeDetail[];
  onSelect?: (employee: EmployeeDetail) => void;
}

export default function EmployeeDetailTable({
  employees,
  onSelect,
}: EmployeeDetailTableProps) {
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
            <tr
              key={row.id}
              className={
                onSelect ? "cursor-pointer hover:bg-gray-50" : undefined
              }
              onClick={() => onSelect?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
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
