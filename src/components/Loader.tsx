interface LoaderProps {
    message?: string;
    size?: "small" | "medium" | "large";
}

export const Loader = ({ message = "Cargando...", size = "medium" }: LoaderProps) => {
    const sizeClasses = {
        small: "w-8 h-8",
        medium: "w-16 h-16",
        large: "w-24 h-24"
    };

    const containerHeight = {
        small: "py-8",
        medium: "py-16",
        large: "py-24"
    };

    return (
        <div className={`flex flex-col items-center justify-center ${containerHeight[size]}`}>
            {/* Baseball Animation */}
            <div className="relative mb-6">
                <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-200 border-t-blue-600`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">⚾</span>
                </div>
            </div>

            {/* Loading Text */}
            <p className="text-gray-600 font-semibold text-center">
                {message}
            </p>

            {/* Animated Dots */}
            <div className="flex gap-1 mt-4">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
        </div>
    );
};
