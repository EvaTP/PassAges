"use client";

export default function ConfirmationModal({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg text-white text-center w-80 ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <p className="text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
