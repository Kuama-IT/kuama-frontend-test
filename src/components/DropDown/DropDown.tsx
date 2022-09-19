import React, { useState } from "react";
import styles from "./DropDown.module.scss";

import { DropDownProps, OptionsListProps } from "./DropDown.interface";

const DropDown: React.FC<DropDownProps> = (props) => {
  const [selectValue, setSelectValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnSelect = (option: string) => {
    setSelectValue(option);
    setIsOpen(false);
    props.onChange(option);
  };

  const OptionsList: React.FC<OptionsListProps> = (props) => {
    return (
      <div className={styles.dropdown_optionsList}>
        {props.options.map((option, index) => (
          <div
            key={index + option}
            className={styles.dropdown_option}
            onClick={() => handleOnSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
      <div className={`${styles.dropdown_inner} ${isOpen ? styles.open : ""}`}>
        <div className={styles.dropdown_toggle}>
          <span>{selectValue ?? "Select payment type"}</span>
          <div className={styles.dropdown_arrow}></div>
        </div>

        <OptionsList options={props.options} />
      </div>
    </div>
  );
};

export default DropDown;
