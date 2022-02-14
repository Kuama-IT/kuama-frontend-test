import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const FieldComp = ({ fieldKey, fieldValue }) => {
  const [valueField, setValueField] = useState('');

  const handleValidation = (event) => {
    const regExp = new RegExp(`${fieldValue}`);
    setValueField(event.target.value);
  };

  return(
    <>
      <FloatingLabel
        controlId="floatingInput"
        label={fieldKey.replace(/_/ig,' ')}
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder={valueField}
          onChange={handleValidation}
        />
      </FloatingLabel>
    </>
  );
};

export default FieldComp;
