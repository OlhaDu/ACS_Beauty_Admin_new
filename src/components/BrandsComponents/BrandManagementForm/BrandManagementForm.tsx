import { useState, ChangeEvent, FormEvent, useRef } from "react"

import cn from "classnames"
import s from "./BrandManagementForm.module.scss"
import AddImageIcon from "src/images/svg/AddImageIcon"
import DeleteIcon from "src/images/svg/DeleteIcon.tsx"

import { IBrand } from "src/api/brands/types"
import { createNewBrand, patchBrand } from "src/redux/brands/operations"
import { useAppDispatch } from "src/redux/hooks"

interface IProps {
  brand?: IBrand
  onClose: () => void
}

const BrandManagementForm: React.FC<IProps> = ({ brand, onClose }) => {
  const dispatch = useAppDispatch()
  const brandInputRef = useRef<HTMLInputElement | null>(null)

  const [brandName, setBrandName] = useState(brand?.name || "")
  const [brandDescription, setBrandDescription] = useState(brand?.description || "")
  const [file, setFile] = useState<File | undefined>(undefined)
  const [image, setImage] = useState(brand?.logo || "")
  const [formErrror, setFormErrror] = useState(false)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return

    const file = event.target.files[0]
    setFile(file)

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!brandName.trim() || !brandDescription.trim() || (!file && !image)) {
      setFormErrror(true)
      return
    }

    const formData = new FormData()
    formData.append("logo", file || image)
    formData.append("name", brandName.trim())
    formData.append("description", brandDescription.trim())

    if (brand) {
      const { id } = brand
      dispatch(patchBrand({ id, formData }))
    } else {
      dispatch(createNewBrand(formData))
    }

    onClose()
    setBrandName("")
    setBrandDescription("")
    setImage("")
  }

  return (
    <form className={s.brand_form} onSubmit={handleSubmit}>
      {image ? (
        <div className={s.brand_form__image_container}>
          <img className={s.brand_form__image} src={image} alt={brandName} />
          <div
            className={s.brand_form__image_delete_icon}
            onClick={() => {
              setImage("")
              setFile(undefined)
            }}
          >
            <DeleteIcon fill={"#5C5E60"} />
          </div>
        </div>
      ) : (
        <div>
          <div
            className={cn(s.brand_form__download_container, {
              [s.brand_form__error]: formErrror,
            })}
            onClick={() => brandInputRef.current?.click()}
          >
            <AddImageIcon fill={"#5C5E60"} />
            <p className={s.brand_form__download_text}>Завантажити банер</p>
          </div>
          {formErrror && <p className={s.brand_form__text_error}>Будь-ласка, завантажте фото.</p>}
        </div>
      )}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        ref={brandInputRef}
        onChange={handleImageChange}
        className={s.brand_form__image_input}
      />

      <div className={s.brand_form__label_container}>
        <label htmlFor="brandName" className={s.brand_form__label}>
          Назва
        </label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          value={brandName}
          onChange={e => {
            setBrandName(e.target.value)
            setFormErrror(false)
          }}
          className={cn(s.brand_form__input, {
            [s.brand_form__error]: formErrror && !brandName,
          })}
          autoComplete="off"
        />
        {formErrror && !brandName && (
          <p className={s.brand_form__text_error}>Це поле обовʼязкове.</p>
        )}
      </div>

      <div className={s.brand_form__label_container}>
        <label htmlFor="brandDescription" className={s.brand_form__label}>
          Опис
        </label>
        <textarea
          id="brandDescription"
          name="brandDescription"
          value={brandDescription}
          onChange={e => {
            setBrandDescription(e.target.value)
            setFormErrror(false)
          }}
          className={cn(s.brand_form__textarea, {
            [s.brand_form__error]: formErrror && !brandDescription,
          })}
        />
        {formErrror && !brandDescription && (
          <p className={s.brand_form__text_error}>Це поле обовʼязкове.</p>
        )}
      </div>

      <button type="submit" className={s.brand_form__button}>
        {brand ? "РЕДАГУВАТИ" : "ДОДАТИ"}
      </button>
    </form>
  )
}

export default BrandManagementForm
