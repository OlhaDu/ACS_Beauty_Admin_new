import React, { useState } from "react";
import s from "./Header.module.scss";
import { Link } from "react-router-dom";
// import LoginIcon from "../../../svgs/LoginIcon";
import LoginIcon from "src/images/svg/LoginIcon";
// import NotificationIcon from "../../../svgs/NotificationIcon";
import NotificationIcon from "src/images/svg/NotificationIcon";
// import NotificationPopup from "../../../components/Popups/NotificationPopup/NotificationPopup";
import NotificationPopup from "../Popups/NotificationPopup/NotificationPopup";
// import ProfilePopup from "../../../components/Popups/ProfilePopup/ProfilePopup";
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
          <div className={s.popup}>
            {notificationPopupVisible && <NotificationPopup />}
          </div>
        </div>
        <div className={s.icon} onClick={toggleProfilePopup}>
          <LoginIcon color={"white"} />
          <div className={s.popup}>
            {profilePopupVisible && <ProfilePopup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
