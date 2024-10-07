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
            className="rounded-full"
          >
            <Bell className="h-5 w-5" />
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