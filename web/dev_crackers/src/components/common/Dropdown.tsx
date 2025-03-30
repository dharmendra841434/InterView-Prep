"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

interface DropdownProps {
  label: string;
  items: string[];
  onSelectItem: (item: string) => void;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  onSelectItem,
  value = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelectItem(item);
  };

  return (
    <div className="relative inline-block w-full max-w-md" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className=" font-light">{value ? value : label}</span>
        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
      </div>
      {isOpen && (
        <ul className="absolute left-0 mt-2 z-40 h-[12rem] overflow-y-scroll  w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg text-white">
          {items.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                handleSelect(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
