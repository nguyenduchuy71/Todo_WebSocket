import React from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Nav = () => {
  const navigate = useNavigate();

  const onNotificationClick = (notification) => {
    navigate(notification.cta.data.url);
  };

  const onLogOut = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <nav className="navbar">
      <h3 style={{ cursor: "default" }}>Team's task</h3>
      <div className="navbar__list">
        <NovuProvider
          subscriberId={process.env.REACT_APP_SUBSCRIBER_ID}
          applicationIdentifier={process.env.REACT_APP_APPLICATION_IDENTIFIER}
        >
          <PopoverNotificationCenter
            onNotificationClick={onNotificationClick}
            colorScheme="light"
          >
            {({ unseenCount }) => (
              <NotificationBell unseenCount={unseenCount} />
            )}
          </PopoverNotificationCenter>
        </NovuProvider>
        <IoIosLogOut className="navbar__icon" onClick={() => onLogOut()} />
      </div>
    </nav>
  );
};

export default Nav;
