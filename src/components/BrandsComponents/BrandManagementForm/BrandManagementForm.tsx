import { useState, ChangeEvent, FormEvent, useRef } from "react";

import styles from "./BrandManagementForm.module.scss";
import AddImageIcon from "src/images/svg/AddImageIcon";
import DeleteIcon from "src/images/svg/DeleteIcon.tsx";

const BrandManagementForm = () => {
  const brandInputRef = useRef<HTMLInputElement | null>(null);

  const [brandName, setBrandName] = useState<string>("");
  const [brandDescription, setBrandDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("brandName", brandName);
    formData.append("brandDescription", brandDescription);
    formData.append("image", image || "");

    setBrandName("");
    setBrandDescription("");
    setImage(null);
  };

  return (
    <form className={styles.brand_form} onSubmit={handleSubmit}>
      {image ? (
        <div className={styles.brand_form__image_container}>
          <img className={styles.brand_form__image} src={image} alt="Brand" />
          <div
            className={styles.brand_form__image_delete_icon}
            onClick={() => setImage(null)}
          >
            <DeleteIcon fill={"#5C5E60"} />
          </div>
        </div>
      ) : (
        <div
          className={styles.brand_form__download_container}
          onClick={() => brandInputRef.current?.click()}
        >
          <AddImageIcon fill={"#5C5E60"} />
          <p className={styles.brand_form__download_text}>Завантажити банер</p>
        </div>
      )}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        ref={brandInputRef}
        onChange={handleImageChange}
        className={styles.brand_form__image_input}
      />

      <div className={styles.brand_form__label_container}>
        <label htmlFor="brandName" className={styles.brand_form__label}>
          Назва
        </label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className={styles.brand_form__input}
          autoComplete="off"
        />
      </div>

      <div className={styles.brand_form__label_container}>
        <label htmlFor="brandDescription" className={styles.brand_form__label}>
          Опис
        </label>
        <textarea
          id="brandDescription"
          name="brandDescription"
          value={brandDescription}
          onChange={(e) => setBrandDescription(e.target.value)}
          className={styles.brand_form__textarea}
        />
      </div>

      <button type="submit" className={styles.brand_form__button}>
        ДОДАТИ
      </button>
    </form>
  );
};

export default BrandManagementForm;
