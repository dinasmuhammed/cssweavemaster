import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-green-800`}
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;