import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const LoginSuccessAlert = ({ show, onClose }) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 w-[320px]">
      <div className="relative overflow-hidden rounded-xl bg-green-50 border border-green-200 shadow-lg">
        {/* progress line */}
        <div className="absolute top-0 left-0 h-1 bg-green-500 animate-progress" />

        <div className="flex items-start gap-3 p-4">
          <CheckCircle size={22} className="text-green-600 mt-1" />

          <div className="flex-1">
            <h4 className="text-green-800 font-semibold text-sm">
              Login Successful
            </h4>
            <p className="text-green-700 text-xs mt-1">
              Welcome back! Redirecting to home…
            </p>
          </div>

          <button onClick={onClose} className="text-green-600 hover:text-green-800">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessAlert;
