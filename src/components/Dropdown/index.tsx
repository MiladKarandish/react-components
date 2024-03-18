import React, { useState, useMemo } from "react";
import "./style.css";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownItems = useMemo(
    () =>
      options.map((option, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={() => handleSelect(option)}
        >
          {option}
        </div>
      )),
    [options, handleSelect]
  );

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption || "Select an option"}
      </div>
      <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {dropdownItems}
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
