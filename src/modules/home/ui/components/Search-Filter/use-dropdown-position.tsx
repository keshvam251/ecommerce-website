import { RefObject } from "react";

export const usedropdownposition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getdropdownposition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownwidth = 240;
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;
    if (left + dropdownwidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownwidth;

      if (left < 0) {
        left = window.innerWidth - dropdownwidth - 16;
      }
    }
    if (left < 0) {
      left = 16;
    }
    return { top, left };
  };
  return { getdropdownposition };
};
