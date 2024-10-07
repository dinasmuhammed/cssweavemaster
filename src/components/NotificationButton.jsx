import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NotificationButton = ({ message, title = "Notification", duration = 3000 }) => {
  const showNotification = () => {
    toast(title, {
      description: message,
      duration: duration,
    });
  };

  return (
    <Button onClick={showNotification}>
      Show Notification
    </Button>
  );
};

export default NotificationButton;