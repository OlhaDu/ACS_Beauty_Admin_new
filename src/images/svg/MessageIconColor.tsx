interface IPropsSvg {
  color?: string
  size?: string
  background?: string
}

const MessageIconColor = ({ color, background }: IPropsSvg) => {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="26" fill={background} />
      <g transform="translate(13, 13)">
        <path
          id="Vector"
          d="M18 14H10.5L12.5 12H18M6 14V11.5L12.88 4.64C13.07 4.45 13.39 4.45 13.59 4.64L15.35 6.41C15.55 6.61 15.55 6.92 15.35 7.12L8.47 14M20 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V22L6 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 2.89 21.1 2 20 2Z"
          fill={color}
        />
      </g>
    </svg>
  )
}

export default MessageIconColor
