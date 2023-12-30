export interface IEditIcon {
  className?: string;
}

export interface IArrowToRight extends IEditIcon{
  iconSize?: number;
}

export interface IconsPropsStyle extends IEditIcon {
  style: React.CSSProperties;
}

export interface IPropsSvg {
  color?: string;
  size?: string;
}

