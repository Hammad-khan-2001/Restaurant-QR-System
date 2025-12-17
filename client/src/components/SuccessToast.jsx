import toast from "react-hot-toast";
import { CheckCircle2, X } from "lucide-react";

const SuccessToast = ({ t, message }) => {
  return (
    <div
      className="bg-[#0f5132] text-white rounded-xl shadow-lg w-[340px] overflow-hidden"
    >
      {/* CONTENT */}
      <div className="flex items-center gap-3 px-4 py-3">
        <CheckCircle2 className="w-6 h-6 text-[#9ae6b4]" />

        <p className="text-sm font-medium flex-1 tracking-wide">
          {message}
        </p>

        <button onClick={() => toast.dismiss(t.id)}>
          <X className="w-4 h-4 text-white/70 hover:text-white" />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-[3px] bg-[#14532d]">
        <div
          className="h-full bg-[#4ade80] animate-toast-progress"
          style={{ animationDuration: "3000ms" }}
        />
      </div>
    </div>
  );
};

export default SuccessToast;
