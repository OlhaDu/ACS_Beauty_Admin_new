import React, { useState } from "react"
import s from "./ChangeStatus.module.scss"
import { IProps } from "src/types/Reviews"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { useAppDispatch } from "src/redux/store"
import { patchReviews } from "src/redux/reviews/operations"

const ChangeStatus: React.FC<IProps> = ({ review, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState("")
  console.log("selectedStatus item", selectedStatus)
  const handleSave = () => {
    if (selectedStatus && review?.id !== undefined) {
      dispatch(patchReviews({ id: review?.id, status: { status: selectedStatus } }))
    }
    onClose()
  }
  const dispatch = useAppDispatch()

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value)
  }

  return (
    <>
      <div className={s.radioBtn}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={handleRadioChange}>
            <FormControlLabel value="published" control={<Radio />} label="Опубліковано" />
            <FormControlLabel value="pending" control={<Radio />} label="На перевірці" />
          </RadioGroup>
        </FormControl>
        <button type="button" title="SafeButton" className={s.safeBtn} onClick={handleSave}>
          ЗБЕРЕГТИ
        </button>
      </div>
    </>
  )
}

export default ChangeStatus
