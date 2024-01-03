import React, { useState } from "react";
import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import LoginIcon from "src/images/svg/LoginIcon";
import NotificationIcon from "src/images/svg/NotificationIcon";
import NotificationPopup from "../Popups/NotificationPopup/NotificationPopup";
import ProfilePopup from "../Popups/ProfilePopup/ProfilePopup";

const Header = () => {
  const [notificationPopupVisible, setNotificationPopupVisible] =
    useState(false);
  const [profilePopupVisible, setProfilePopupVisible] = useState(false);

  const toggleNotificationPopup = () => {
    setNotificationPopupVisible(!notificationPopupVisible);
    setProfilePopupVisible(false);
  };

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!profilePopupVisible);
    setNotificationPopupVisible(false);
  };
  return (
    <div className={s.container}>
      <Link to="/" className={s.headerLogo}>
        ACS Beauty
      </Link>
      <div className={s.headerMenu}>
        <div className={s.icon} onClick={toggleNotificationPopup}>
          <NotificationIcon />
          {notificationPopupVisible && (
            <div className={s.popup}>
              <NotificationPopup />
            </div>
          )}
        </div>
        <div className={s.icon} onClick={toggleProfilePopup}>
          <LoginIcon color="white" />

          {profilePopupVisible && (
            <div className={s.popup}>
              <ProfilePopup />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;