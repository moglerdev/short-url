import React from "react";
import { twMerge } from "tailwind-merge";

function InputInner({
  className,
  ...props
} : React.InputHTMLAttributes<HTMLInputElement>, 
ref : React.Ref<HTMLInputElement>) {
  return (
    <input ref={ref} {...props} className={twMerge("p-2 rounded border border-slate-500 bg-slate-800 text-white", className)} />
  )
}

export const Input = React.forwardRef(InputInner);
