import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NotificationButton = ({ message, title = "Notification", duration = 3000 }) => {
  const showNotification = () => {
    toast(title, {
      description: message,
      duration: duration,
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={showNotification} 
            variant="ghost" 
            size="icon"
            className="w-6 h-6 p-0"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Show Notification</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show Notification</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NotificationButton;