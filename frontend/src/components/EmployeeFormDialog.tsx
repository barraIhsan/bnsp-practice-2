import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export interface EmployeeFormData {
  name: string;
  job_title: string;
  salary: number;
}

interface EmployeeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
  defaultValues?: Partial<EmployeeFormData>;
}

export default function EmployeeFormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: EmployeeFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  if (!open) return null;

  const isEdit = !!defaultValues?.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>

            <input
              type="text"
              placeholder="e.g. John Doe"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Job Title
            </label>

            <input
              type="text"
              placeholder="e.g. Software Engineer"
              {...register("job_title", {
                required: "Job title is required",
              })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {errors.job_title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.job_title.message}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Salary</label>

            <input
              type="number"
              placeholder="5000"
              {...register("salary", {
                required: "Salary is required",
                min: {
                  value: 0,
                  message: "Salary must be 0 or more",
                },
                valueAsNumber: true,
              })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {errors.salary && (
              <p className="text-xs text-red-500 mt-1">
                {errors.salary.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
