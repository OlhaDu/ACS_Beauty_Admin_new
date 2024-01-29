import React from "react"

import s from "./PageToolsPanel.module.scss"
import Select from "../ToolsPanel/Select/Select"
import ExportFileIcon from "src/images/svg/ExportFileIcon"
import SearchInput from "../ToolsPanel/SearchInput/SearchInput"

interface IProps {
  title: string
  btnTitle: string
  setSearchName: (value: string) => void
  setIsOpenModal: (value: boolean) => void
}

const PageToolsPanel: React.FC<IProps> = ({ title, btnTitle, setSearchName, setIsOpenModal }) => {
  return (
    <>
      <div className={s.page_tools__title}>
        <h2 className={s.page_tools__title_text}>{title}</h2>
        <button type="button" className={s.page_tools__button} onClick={() => setIsOpenModal(true)}>
          {btnTitle}
        </button>
      </div>

      <div className={s.page_tools__tools_group}>
        <SearchInput onChange={setSearchName} />
        <Select
          options={["Експортувати в Exel"]}
          icon={<ExportFileIcon />}
          toolName={"Експортувати"}
        />
      </div>
    </>
  )
}

export default PageToolsPanel
