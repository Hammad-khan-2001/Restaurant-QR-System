import { CheckCircle, X } from "lucide-react";

const SuccessToast = ({ t, message }) => {
  return (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"
        } bg-[#16a34a] text-white rounded-xl shadow-lg w-[340px] overflow-hidden`}
    >
      {/* Content */}
      <div className="flex items-center gap-3 px-4 py-3">
        <CheckCircle className="w-6 h-6 text-white" />

        <p className="text-sm font-medium flex-1">
          {message}
        </p>

        <button onClick={() => toast.dismiss(t.id)}>
          <X className="w-4 h-4 opacity-80 hover:opacity-100" />
        </button>
      </div>

      {/* Timeline / Progress bar */}
      <div className="h-[3px] bg-white/30">
        <div
          className="h-full bg-white animate-toast-progress"
          style={{ animationDuration: "5s" }}
        />
      </div>
    </div>
  );
};

export default SuccessToast;
