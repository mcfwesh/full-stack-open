import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  console.log(notification);
  return (
    notification && (
      <Alert severity={notification.type} className="error">
        {notification.info}
      </Alert>
    )
  );
};

export default Notification;
