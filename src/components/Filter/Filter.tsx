import { useState, FC, useRef } from "react"
import cn from "classnames"
import s from "./Filter.module.scss"
import DropdownArrow from "src/images/svg/DropdownArrow"
import FilterIcon from "src/images/svg/FilterIcon"
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon"
import useOnClickOutside from "use-onclickoutside"

type Option = {
  optionName: string
  suboptions: string[]
}

export interface FilterProps {
  options: Option[]
}

const Filter: FC<FilterProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({})

  const handleOptionClick = (optionName: string) => {
    setExpandedOptions(prevOptions => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName],
    }))
  }

  const handleSuboptionClick = (optionName: string, suboption: string) => {
    setSelectedOptions(prevOptions => {
      const newOptions = { ...prevOptions }

      if (newOptions[optionName] === suboption) {
        delete newOptions[optionName]
      } else {
        newOptions[optionName] = suboption
      }
      return newOptions
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useOnClickOutside(containerRef, handleClose)

  return (
    <div ref={containerRef} className={s.container}>
      <div className={s.fieldContainer} onClick={handleToggle}>
        <div className={s.icon}>
          <FilterIcon />
        </div>
        <div className={s.dropdownArrow}>
          <DropdownArrow />
        </div>
        <div className={s.heading}>Фільтрувати</div>
      </div>
      {isOpen && (
        <div className={s.optionListContainer} style={isOpen ? { borderTop: "none" } : {}}>
          <>
            {options.map((option, idx) => (
              <ul key={idx}>
                <div onClick={() => handleOptionClick(option.optionName)} className={s.option}>
                  {option.optionName}

                  <span
                    style={{
                      transform: expandedOptions[option.optionName] ? "rotate(180deg)" : "none",
                      display: "inline-block",
                    }}
                  >
                    <ArrowToBottomIcon size="24" />
                  </span>
                </div>

                {expandedOptions[option.optionName] && (
                  <ul>
                    {option.suboptions.map((suboption, subIdx) => (
                      <li
                        key={subIdx}
                        onClick={() => handleSuboptionClick(option.optionName, suboption)}
                        className={cn(s.suboption, {
                          [s.clicked]: selectedOptions[option.optionName] === suboption,
                        })}
                      >
                        {suboption} {selectedOptions[option.optionName] === suboption && "✔"}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            ))}
          </>
        </div>
      )}
    </div>
  )
}

export default Filter
