import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Notify user about the error
    toast.error("An error occurred. Please try refreshing the page.");
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleReportError = () => {
    // Here you could implement error reporting to your backend
    toast.success("Error reported. Thank you for your feedback!");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We're sorry for the inconvenience. Please try refreshing the page or report this issue if it persists.
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={this.handleRefresh}
              className="bg-green-800 hover:bg-green-700"
            >
              Refresh Page
            </Button>
            <Button 
              variant="outline" 
              onClick={this.handleReportError}
              className="border-green-800 text-green-800 hover:bg-green-50"
            >
              Report Issue
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;