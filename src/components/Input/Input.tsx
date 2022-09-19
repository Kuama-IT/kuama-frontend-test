import React, { useState } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./Input.interface";

const Input: React.FC<InputProps> = (props) => {
  const [validationStyle, setValidationStyle] = useState<string>("");
  const handleValidation = (value: string, rule: string) => {
    const regex = new RegExp(rule);
    return regex.test(value);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rule: string | undefined
  ) => {
    if (e.target.value.length > 3 && rule) {
      setValidationStyle(
        handleValidation(e.target.value, rule) ? styles.valid : styles.invalid
      );
    }
  };

  return (
    <label className={styles.inputWrapper}>
      <span>{props.label}</span>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={(e) => handleOnChange(e, props.validationRule)}
        className={validationStyle}
      />
    </label>
  );
};

export default Input;
