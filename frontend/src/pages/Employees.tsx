import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import EmployeeFormDialog, {
  type EmployeeFormData,
} from "@/components/EmployeeFormDialog";

import DeleteDialog from "@/components/DeleteDialog";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  type Employee,
} from "@/lib/api";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const handleAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditTarget(employee);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data: EmployeeFormData) => {
    try {
      if (editTarget) {
        await updateEmployee(editTarget.id, data);
      } else {
        await createEmployee(data);
      }

      await fetchAllEmployees();

      setFormOpen(false);
      setEditTarget(null);
    } catch (err) {
      console.error("Failed to save employee:", err);
    }
  };

  const handleDeleteClick = (employee: Employee) => {
    setDeleteTarget(employee);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteEmployee(deleteTarget.id);

      await fetchAllEmployees();

      setDeleteOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{employees.length} employees</p>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">#</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Job Title</th>
                <th className="px-5 py-3 font-medium">Salary</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee, i) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>

                  <td className="px-5 py-3 font-medium text-gray-900">
                    {employee.name}
                  </td>

                  <td className="px-5 py-3 text-gray-500">
                    {employee.job_title}
                  </td>

                  <td className="px-5 py-3 text-gray-900">
                    ${employee.salary.toLocaleString()}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(employee)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleFormSubmit}
        defaultValues={editTarget ?? undefined}
      />

      <DeleteDialog
        open={deleteOpen}
        character={deleteTarget?.name ?? ""}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
