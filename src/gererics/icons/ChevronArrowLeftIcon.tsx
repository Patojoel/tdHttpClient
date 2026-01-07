import React from 'react';
import {IconProps} from "@/shared/lib/IconProps";

const ChevronArrowLeftIcon = (props:IconProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M10 12 6 8l4-4"
      ></path>
    </svg>
  );
};

export default ChevronArrowLeftIcon;
