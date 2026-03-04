import { useEffect } from 'react';

type ToastProps = {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
};

export const Toast = ({ message, isVisible, onClose, duration = 3000 }: ToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm animate-pulse">
                <span className="text-xl">✅</span>
                <span className="font-semibold">{message}</span>
            </div>
        </div>
    );
};
