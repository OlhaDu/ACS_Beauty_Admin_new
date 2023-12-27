import type { IPropsSvg } from 'src/types/icons/interfaces';

const ArrowToBottomIcon = ({ size } : IPropsSvg) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 48}
      height={size || 48}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M14.82 16.59L12 19.41L24 31.41L36 19.41L33.18 16.59L24 25.75L14.82 16.59Z"
        fill="#5C5E60"
      />
    </svg>
  );
};

export default ArrowToBottomIcon;
