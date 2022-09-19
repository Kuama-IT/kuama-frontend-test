import React, { useEffect, useRef } from "react";
import CustomInput from "../Input/Input";
import { TabProps } from "./Tabs.interface";

import styles from "./Tabs.module.scss";

const convertLabel = (label: string) => {
  return label.split("_").join(" ");
};

const PaymentSection: React.FC<TabProps> = (props) => {
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.isActive &&
      tabRef.current &&
      tabRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props.isActive]);

  return (
    <div ref={tabRef} className={styles.tabs_item}>
      {props.fields.map((field, index) => (
        <CustomInput
          key={index.toString() + field}
          label={convertLabel(field.label)}
          placeholder={convertLabel(field.label)}
          validationRule={field.validation}
        />
      ))}
    </div>
  );
};

export default PaymentSection;
