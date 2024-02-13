import { useFormikContext } from "formik"
import { ChangeEvent, FC, ReactNode, useRef, useState } from "react"
import AddIcon from "src/images/svg/AddIcon_"
import Border from "../../Border"
import s from "./AddImageInput.module.scss"
import { IAddImageInput } from "src/types/categories"
import DeleteIcon from "src/images/svg/DeleteIcon"

const AddImageInput: FC<IAddImageInput> = ({ image, slug }) => {
  const [bgImage, setBgImage] = useState<string>(image || "")
  const inputRef = useRef<HTMLInputElement>(null)
  const { setFieldValue, errors } = useFormikContext<{ image: File }>()

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return

    const file = e.currentTarget.files[0]
    setFieldValue("image", file)

    if (file.type.split("/")[0] !== "image") return

    const imageUrl = URL.createObjectURL(file)
    setBgImage(imageUrl)
  }

  const handleDeleteIconClick = () => {
    setBgImage("")
    setFieldValue("image", null)

    const input = inputRef.current
    if (input) input.value = ""
  }

  const handleAddIconClick = () => inputRef.current?.click()

  return (
    <>
      <Border border="borderDashed">
        {bgImage ? (
          <div className={s.add_img__image_container}>
            <img src={bgImage} alt={slug} className={s.add_img__image} />
            <DeleteIcon onClick={handleDeleteIconClick} className={s.add_img__add_delete_icon} />
          </div>
        ) : (
          <div onClick={handleAddIconClick} className={s.add_img__load_container}>
            <AddIcon className={s.add_img__add_icon} />
            <p className={s.add_img__text}>Додати зображення</p>
          </div>
        )}
        <input
          name="image"
          type="file"
          accept="image/*"
          className={s.add_img__input}
          onChange={onImageChange}
          ref={inputRef}
        />
      </Border>
      {errors.image && <p className={s.error}>{errors.image as ReactNode}</p>}
    </>
  )
}

export default AddImageInput
