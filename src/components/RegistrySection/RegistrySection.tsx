import React from "react";
import CustomInput from "../Input/Input";
import { RegistrySectionProps } from "./RegistrySection.interface";

const convertLabel = (label: string) => {
  return label.split("_").join(" ");
};

const RegistrySection: React.FC<RegistrySectionProps> = (props) => {
  return (
    <>
      {props.fields.length > 0 && (
        <>
          <h3>Registry</h3>
          {props.fields.map((field, index) => (
            <CustomInput
              key={index.toString() + field}
              label={convertLabel(field.label)}
              placeholder={convertLabel(field.label)}
              validationRule={field.validation}
            />
          ))}
        </>
      )}
    </>
  );
};

export default RegistrySection;
