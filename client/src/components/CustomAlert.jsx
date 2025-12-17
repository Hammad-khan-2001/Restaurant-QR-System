import React from "react";
import { X } from "lucide-react";

const CustomAlert = ({ show, message, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[350px] p-5 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <h3 className="text-green-600 text-xl font-semibold mb-3">🎉 Success!</h3>
                <p className="text-gray-700">{message}</p>

                {/* OK Button */}
                <button
                    onClick={onClose}
                    className="mt-5 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
