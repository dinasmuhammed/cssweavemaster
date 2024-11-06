import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const SlowConnectionMessage = () => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Slow Connection Detected</AlertTitle>
      <AlertDescription>
        Your network speed is unusually slow. Please be patient while we load the content, or try again when you have a better connection.
      </AlertDescription>
    </Alert>
  );
};

export default SlowConnectionMessage;