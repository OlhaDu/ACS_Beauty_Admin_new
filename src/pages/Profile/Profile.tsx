import React from "react";
import AdminLayout from "src/layouts/AdminLayout";
import ProfileForm from "./Form/Form";

const Profile: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <ProfileForm />
      </AdminLayout>
    </>
  );
};

export default Profile;
