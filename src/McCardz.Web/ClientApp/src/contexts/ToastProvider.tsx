import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";

const ToastContext = createContext((_type: ToastType, _message: string) => {
});

export enum ToastType {
    Success,
    Danger
}

class ToastMessage {
    id: string;
    until: number;
    type: ToastType;
    message: string;

    constructor(type: ToastType, message: string) {
        this.id = crypto.randomUUID();
        this.until = Date.now() + 5000;
        this.type = type;
        this.message = message;
    }
}

const ToastProvider = ({children}: PropsWithChildren) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (type: ToastType, message: string) => {
        setToasts([...toasts, new ToastMessage(type, message)]);
    };

    const deleteToast = (id: string) => {
        setToasts(toasts.filter(toast => toast.id !== id));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newToasts = toasts.filter(toast => toast.until > Date.now());

            if (newToasts.length != toasts.length)
                setToasts(newToasts);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [toasts]);

    return <ToastContext.Provider value={addToast}>
        {children}
        <div className="toast-container bottom-0 end-0 p-3">
            {toasts.map((toast: ToastMessage) => (
                <div key={toast.id}
                     className={"toast show fade align-items-center border-0 " + (toast.type === ToastType.Success ? "text-bg-success" : toast.type === ToastType.Danger ? "text-bg-danger" : "text-bg-primary")}
                     role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {toast.message}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                aria-label="Close" onClick={() => deleteToast(toast.id)}></button>
                    </div>
                </div>
            ))}
        </div>
    </ToastContext.Provider>;
};

export const useToast = () => {
    return useContext(ToastContext)
};

export default ToastProvider;