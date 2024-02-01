import { useFormikContext } from "formik"
import { ChangeEvent, FC, ReactNode, useRef, useState } from "react"

import s from "./AddLogoInput.module.scss"
import DeleteIcon from "src/images/svg/DeleteIcon"
import AddImageIcon from "src/images/svg/AddImageIcon"

import { IAddLogoInput } from "src/types/brands"

const AddLogoInput: FC<IAddLogoInput> = ({ brandName, brandLogo }) => {
  const { setFieldValue, errors } = useFormikContext<{ logo: File }>()
  const [image, setImage] = useState(brandLogo || "")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return

    const file = e.currentTarget.files[0]
    setFieldValue("logo", file)

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const handleCloseIconClick = () => {
    setImage("")
    setFieldValue("logo", null)
  }

  return (
    <>
      {image ? (
        <div className={s.brand_form__image_container}>
          <img className={s.brand_form__image} src={image} alt={brandName} />
          <div className={s.brand_form__image_delete_icon} onClick={handleCloseIconClick}>
            <DeleteIcon />
          </div>
        </div>
      ) : (
        <div>
          <div
            className={s.brand_form__download_container}
            onClick={() => inputRef.current?.click()}
          >
            <AddImageIcon fill={"#5C5E60"} />
            <p className={s.brand_form__download_text}>Завантажити банер</p>
          </div>
        </div>
      )}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className={s.brand_form__image_input}
      />
      {errors.logo && <p className={s.error}>{errors.logo as ReactNode}</p>}
    </>
  )
}

export default AddLogoInput
