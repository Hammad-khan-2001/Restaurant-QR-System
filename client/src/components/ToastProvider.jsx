import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return (
        <Toaster
            position="top-center"
            gutter={12}
            toastOptions={{
                duration: 5000,
                style: {
                    padding: "0",
                    background: "transparent",
                    boxShadow: "none",
                },
            }}
        />
    );
};

export default ToastProvider;
