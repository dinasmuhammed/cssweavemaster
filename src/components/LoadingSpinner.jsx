import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LoadingSpinner = ({ 
  size = "default", 
  className = "", 
  fullScreen = false,
  text = "Loading..." 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  const containerClasses = cn(
    "flex flex-col justify-center items-center",
    fullScreen ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50" : "p-4",
    className
  );

  return (
    <div className={containerClasses}>
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-green-800`}
        aria-label="Loading"
      />
      {text && (
        <p className="mt-2 text-sm text-green-800 font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;