import { useEffect } from "react";

const NotificationComponent = () => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const notify = () => {
    if (Notification.permission === "granted") {
      new Notification("New Message!", {
        body: "You have a new message.",
        icon: "https://via.placeholder.com/100",
        
      });
    }
  };

  return <button onClick={notify}>Notify Me</button>;
};

export default NotificationComponent;
