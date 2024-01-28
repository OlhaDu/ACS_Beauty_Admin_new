import React, { useEffect, useState, useRef } from "react"
import { ErrorMessage } from "formik"
import styles from "./FileUploader.module.scss"
import Preview from "src/images/photo/FileUploader.png"
import profileData from "../../profileData.json"

interface FileUploaderProps {
  id: string
  type: string
  avatar: string | null
  value: string | null
  onChange: (file: File | null) => void
  setImage: (file: File | null) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ id, avatar, onChange }) => {
  const [drag, setDrag] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleRemoveImage = () => {
    setImage(null)
    onChange(null)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setImage(file)
      onChange(file)
    }
  }

  function dragStartHandler(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
  }

  function dragLeaveHandler(e: React.DragEvent) {
    e.preventDefault()
    setDrag(false)
  }

  function onDropHandler(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files

    if (files.length > 0) {
      const file = files[0]
      setImage(file)
      onChange(file)
    }

    setDrag(false)
  }

  useEffect(() => {
    if (avatar) {
      fetch(avatar)
        .then(response => response.blob())
        .then(blob => {
          setImage(new File([blob], "avatar") as File)
        })
    }
  }, [avatar])

  return (
    <div className={styles.fileinputWrapper}>
      <h2 className={styles.formTitle}>Фото профілю</h2>
      <div className={styles.inputWrapper}>
        <div
          className={`${drag ? styles.dropArea : styles.dragArea}`}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}
        >
          <label className={styles.regLabel} title={profileData[16]}>
            <input
              ref={fileInputRef}
              className={styles.filesField}
              accept="image/jpeg, image/png, image/gif"
              onChange={handleImageChange}
              name="avatar"
              type="file"
              id={id}
            />

            <ErrorMessage className={styles.error} name="avatar" component="div" />
            {image ? (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  id="preview"
                  className={styles.imgAfter}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className={styles.removeButton}
                  title={profileData[17]}
                >
                  &times;
                </button>
              </>
            ) : (
              <img src={Preview} alt="placeholder" id="placeholder" className={styles.imgBefore} />
            )}
          </label>
        </div>
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.limits}>{profileData[18]}</p>
        <p className={styles.limits}>{profileData[19]}</p>
      </div>
    </div>
  )
}

export default FileUploader
