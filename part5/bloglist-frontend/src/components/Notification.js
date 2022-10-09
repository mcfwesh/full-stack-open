import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  console.log(notification);
  return (
    notification && (
      <Alert severity="info" className="error">
        {notification}
      </Alert>
    )
  );
};

export default Notification;
