// svg search icon
// Created by Man Nguyen
// 20/10/2023

import React from "react";

import "./cancel.scss"

function CancelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="cancel_icon MuiChip-deleteIcon MuiChip-deleteIconSmall MuiChip-deleteIconColorDefault MuiChip-deleteIconFilledColorDefault MuiBox-root css-1t9pz9x iconify iconify--solar"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#b0b8c0"
    >
      <path
        // fill="currentColor"
        fillRule="evenodd"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CancelIcon;
