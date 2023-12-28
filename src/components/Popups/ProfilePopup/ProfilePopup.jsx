import React from "react";
import styles from "./ProfilePopup.module.scss";
import MyProfileDataIcon from "../../../images/svg/MyProfileDataIcon";
import LogoutIcon from "../../../images/svg/LogoutIcon";

const ProfilePopup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <span>
          <MyProfileDataIcon /> Мої дані
        </span>
        <span>
          <LogoutIcon /> Вихід
        </span>
      </div>
    </div>
  );
};

export default ProfilePopup;
