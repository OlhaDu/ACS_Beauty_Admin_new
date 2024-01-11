export interface IIcon {
  className?: string
}

export interface IArrowToRight extends IIcon {
  iconSize?: number
}

export interface ICloseIcon {
  onClick: React.MouseEventHandler<SVGSVGElement>
}
