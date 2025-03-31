import React from "react";

interface IinputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }:IinputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-gray-300 text-sm">{label}</label>}
      <input
        className="outline-none px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
        {...props}
      />
    </div>
  );
};

export default Input;
