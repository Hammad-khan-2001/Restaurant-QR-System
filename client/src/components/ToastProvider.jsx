import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return (
        <Toaster
            position="top-center"
            gutter={12}
            toastOptions={{
                duration: 2000, // 2 seconds
                style: {
                    background: "#16a34a", // professional dark green
                    color: "#fff",
                    padding: "12px 20px",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
                success: {
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#16a34a",
                    },
                },
            }}
        />
    );
};

export default ToastProvider;

