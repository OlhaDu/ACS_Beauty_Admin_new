import React, { FC } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const FormatListNumberIcon: FC<Props> = ({
  width = 24,
  height = 24,
  fill = "#5C5E60",
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <circle cx="26" cy="26" r="26" fill="#948AD0" /> */}
      <path
        fill={fill}
        d="M7 13v-2h14v2H7Zm0 6v-2h14v2H7ZM7 7V5h14v2H7ZM3 8V5H2V4h2v4H3Zm-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2Zm2.25-7a.75.75 0 0 1 .54 1.27L3.12 13H5v1H2v-.92L4 11H2v-1h2.25Z"
      />
    </svg>
  );
};

export default FormatListNumberIcon;
