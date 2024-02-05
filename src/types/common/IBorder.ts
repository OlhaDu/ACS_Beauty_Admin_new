import { PropsWithChildren } from "react"

export interface IBorder extends PropsWithChildren {
  border: "borderDefault" | "borderOuter" | "borderDashed"
  className?: string
}
