import { useFormikContext } from "formik"
import { ChangeEvent, ReactNode } from "react"
import AddIcon from "src/images/svg/AddIcon_"
import Border from "../Border"
import s from "./AddImageInput.module.scss"

const AddImageInput = () => {
  const { setFieldValue, errors } = useFormikContext<{
    image: File
  }>()

  const loadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return
    const file = e.currentTarget.files[0]
    file && setFieldValue("image", file)
  }
  return (
    <>
      <Border border="borderDashed" className={s.borderAddImg}>
        <label htmlFor="image" className={s.label}>
          <input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            className={s.input}
            onChange={loadImageHandler}
          />
          <AddIcon className={s.addIcon} />
          <p className={s.actionNave}>Додати зображення</p>
        </label>
      </Border>
      {errors.image && <p className={s.error}>{errors.image as ReactNode}</p>}
    </>
  )
}

export default AddImageInput
