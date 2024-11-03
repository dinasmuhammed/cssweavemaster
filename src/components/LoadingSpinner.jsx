import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className={`flex justify-center items-center p-4 ${className}`} role="status">
      <div className="relative">
        <Loader2 
          className={`${sizeClasses[size]} animate-spin text-green-800`}
          aria-hidden="true"
        />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;