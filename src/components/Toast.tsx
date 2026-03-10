import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastProps = {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
    type?: ToastType;
};

const TOAST_STYLES: Record<ToastType, { bg: string; icon: string }> = {
    success: { bg: 'bg-green-500', icon: '✅' },
    error: { bg: 'bg-red-500', icon: '❌' },
    info: { bg: 'bg-blue-500', icon: 'ℹ️' },
    warning: { bg: 'bg-yellow-500', icon: '⚠️' },
};

export const Toast = ({ message, isVisible, onClose, duration = 3500, type = 'success' }: ToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const { bg, icon } = TOAST_STYLES[type];

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4">
            <div className={`${bg} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm`}>
                <span className="text-xl">{icon}</span>
                <span className="font-semibold">{message}</span>
            </div>
        </div>
    );
};
