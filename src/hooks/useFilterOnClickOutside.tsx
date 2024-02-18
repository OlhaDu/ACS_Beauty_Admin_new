import { useEffect } from "react"

const useFilterOnClickOutside = (
  filterOpen: boolean,
  filterRef: React.RefObject<HTMLDivElement>,
  filterButtonRef: React.RefObject<HTMLSpanElement>,
  toggleFilter: () => void
) => {
  useEffect(() => {
    const closeFilter = (e: MouseEvent) => {
      if (filterOpen && filterRef.current && filterButtonRef.current) {
        if (
          !filterRef.current.contains(e.target as Node) &&
          !filterButtonRef.current.contains(e.target as Node)
        ) {
          toggleFilter()
        }
      }
    }

    window.addEventListener("mousedown", closeFilter)

    return () => {
      window.removeEventListener("mousedown", closeFilter)
    }
  }, [toggleFilter, filterRef, filterButtonRef, filterOpen])
}

export default useFilterOnClickOutside