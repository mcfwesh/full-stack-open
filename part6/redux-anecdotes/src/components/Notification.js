import { connect } from "react-redux";

const Notification = ({ notifications }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notifications}</div>;
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
