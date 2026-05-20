import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  character: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  character,
  onClose,
  onConfirm,
}: DeleteDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <Trash2 size={18} />
          </div>
          <h2 className="text-base font-semibold text-gray-900">
            Delete Employee
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-900">{character}</span>? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
