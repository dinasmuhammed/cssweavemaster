import LoadingSpinner from './LoadingSpinner';

const LoadingFallback = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="large" text="Loading content..." />
    </div>
  );
};

export default LoadingFallback;