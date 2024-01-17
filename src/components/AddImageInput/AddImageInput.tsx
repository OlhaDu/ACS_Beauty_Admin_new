import { useFormikContext } from "formik"
import { ChangeEvent, FC, ReactNode } from "react"
import AddIcon from "src/images/svg/AddIcon_"
import Border from "../Border"
import s from "./AddImageInput.module.scss"
import { IAddImageInput } from "src/types"

const AddImageInput: FC<IAddImageInput> = ({ bgImageRef }) => {
  const { setFieldValue, errors } = useFormikContext<{ image: File }>()

  const onInputLoadImageClick = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return
    const file = e.currentTarget.files[0]
    if (!file) return
    setFieldValue("image", file)
    const reader = new FileReader()
    reader.onload = () => {
      if (bgImageRef && bgImageRef.current) {
        const el = bgImageRef.current
        el.style.background = `center / contain no-repeat url(${reader.result})`
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div ref={bgImageRef}>
        <Border border="borderDashed" className={s.borderAddImg}>
          <label htmlFor="image" className={s.label}>
            <input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              className={s.input}
              onChange={onInputLoadImageClick}
            />
            <AddIcon className={s.addIcon} />
            <p className={s.actionNave}>Додати зображення</p>
          </label>
        </Border>
      </div>
      {errors.image && <p className={s.error}>{errors.image as ReactNode}</p>}
    </>
  )
}

export default AddImageInput
