import React, { useState, useEffect } from "react"
import { useFormik, FormikProvider, ErrorMessage, Form } from "formik"
import axios from "axios"
import styles from "./Form.module.scss"
import FileUploader from "../Form/FileUploader/FileUploader"
import { IProfileTypes } from "src/types"
import { profileSchema } from "../schema"
import profileData from "../profileData.json"
import Password from "../Form/Password/Password"
import SuccessMessage from "../Form/Toast/Toast"

const ProfileForm: React.FC = () => {
  const [userData, setUserData] = useState<IProfileTypes | null>(null)
  const [visible, setVisible] = useState(false)
  const [visibleNew, setVisibleNew] = useState(false)
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const token = import.meta.env.VITE_API_AUTH_TOKEN

  const formik = useFormik<IProfileTypes>({
    initialValues: {
      // id: userData?.id || 0,
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
      avatar: userData?.avatar || null,
      password: "",
      newpassword: "",
      confirmpass: "",
      onShowPass: false,
      onClickShowPass: () => {},
    },
    validationSchema: profileSchema,
    onSubmit: async values => {
      try {
        setLoading(true)
        console.log("Form Data:", values)
        const formData = new FormData()
        if (values.firstName) {
          formData.append("firstName", values.firstName)
        }
        if (values.lastName) {
          formData.append("lastName", values.lastName)
        }
        if (values.phone) {
          formData.append("phone", values.phone)
        }
        if (values.email) {
          formData.append("email", values.email)
        }
        formData.append("password", values.password)
        if (values.password.trim() !== "") {
          formData.append("password", values.password)
        }
        if (values.newpassword.trim() !== "") {
          formData.append("newpassword", values.newpassword)
        }
        if (values.confirmpass.trim() !== "") {
          formData.append("confirmpass", values.confirmpass)
        }

        if (values.avatar !== null && values.avatar !== "") {
          formData.append("avatar", values.avatar)
        } else {
          formData.append("avatar", "")
        }
        // if (values.avatar !== null && values.avatar !== "") {
        //   formData.append("avatar", values.avatar)
        // }

        const response = await axios.patch(
          `${baseUrl}/api/user/me/`,
          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setIsSubmitted(true)
        setLoading(false)
        console.log("Server response:", response.data)
      } catch (error) {
        console.error("Error while submitting form:", error)
        setIsSubmitted(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUserData({
          // id: response.data.id,
          lastName: response.data.lastName,
          firstName: response.data.firstName,
          phone: response.data.phone,
          email: response.data.email,
          avatar: response.data.avatar,
          password: "",
          newpassword: "",
          confirmpass: "",
          onShowPass: false,
          onClickShowPass: () => {},
        })
      } catch (error) {
        console.error("Error while fetching user data:", error)
      }
    }

    fetchUserData()
  }, [baseUrl, token])

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.titleProfile}>{profileData[0]}</h1>
        <FormikProvider value={formik}>
          <Form className={styles.form} encType="multipart/form-data">
            <div className={styles.mainWrap}>
              <h2 className={styles.formTitle}>{profileData[1]}</h2>
              <div className={styles.infoWrap}>
                <div className={styles.inputWrapper}>
                  <label htmlFor={profileData[2]} className={styles.regLabel}>
                    {profileData[3]}
                  </label>
                  <input
                    className={styles.signUpField}
                    name="firstName"
                    type="text"
                    id="firstName"
                    placeholder={userData?.firstName}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage className={styles.error} name="firstName" component="div" />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor={profileData[9]} className={styles.regLabel}>
                    {profileData[10]}
                  </label>
                  <input
                    className={styles.signUpField}
                    name="lastName"
                    type="text"
                    id="lastName"
                    placeholder={userData?.lastName}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage className={styles.error} name="lastName" component="div" />
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.regLabel}>{profileData[4]}</label>

                  <input
                    id="phone"
                    className={styles.signUpField}
                    name="phone"
                    placeholder={userData?.phone}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage className={styles.error} name="phone" component="div" />
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.regLabel}>{profileData[5]}</label>

                  <input
                    className={styles.signUpField}
                    name="email"
                    type="email"
                    id="email"
                    placeholder={userData?.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage className={styles.error} name="email" component="div" />
                </div>
              </div>
              <h2 className={styles.formTitle}>{profileData[6]}</h2>
              <div className={styles.infoWrap}>
                <div className={styles.inputWrapper}>
                  <Password
                    title={profileData[11]}
                    text={profileData[11]}
                    errorName="password"
                    onClickShowPass={setVisible}
                    onShowPass={visible}
                    field={formik.getFieldProps("password")}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <Password
                    title={profileData[12]}
                    text={profileData[12]}
                    errorName="newpassword"
                    onClickShowPass={setVisibleNew}
                    onShowPass={visibleNew}
                    field={formik.getFieldProps("newpassword")}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <Password
                    title={profileData[13]}
                    text={profileData[13]}
                    errorName="confirmpass"
                    onClickShowPass={setVisibleConfirm}
                    onShowPass={visibleConfirm}
                    field={formik.getFieldProps("confirmpass")}
                  />
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <button type="submit" className={styles.button}>
                  {loading ? `${profileData[14]}` : `${profileData[15]}`}
                </button>
                {isSubmitted && (
                  <SuccessMessage
                    isSubmitted={isSubmitted}
                    isError={false}
                    closeMessage={() => setIsSubmitted(false)}
                  />
                )}
              </div>
            </div>
            <div className={styles.uploaderWrapper}>
              <FileUploader
                type="file"
                id="fileuploader"
                avatar={userData?.avatar || ""}
                value={formik.values.avatar || ""}
                onChange={file => formik.setFieldValue("avatar", file)}
                setImage={file => formik.setFieldValue("avatar", file)}
              />
            </div>
          </Form>
        </FormikProvider>
      </section>
    </main>
  )
}

export default ProfileForm
