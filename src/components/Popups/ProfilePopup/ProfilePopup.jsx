import React from "react";
import styles from "./ProfilePopup.module.scss";
// import MyProfileDataIcon from "../../../svgs/MyProfileDataIcon";
import MyProfileDataIcon from "src/images/svg/MyProfileDataIcon";
// import LogoutIcon from "../../../svgs/LogoutIcon";
import LogoutIcon from "src/images/svg/LogoutIcon";

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
