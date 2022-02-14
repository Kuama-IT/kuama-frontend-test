import React, { useState } from 'react';
import FieldComp from './FieldComp';
import { Nav, Button } from 'react-bootstrap';


const SelectionFieldComp = ({ data, selectedItemField }) => {
  const [selectNavField, setSelectNavField] = useState('priority');
  const selectedAndFiltredSecondSec = selectedItemField.filter(i => i.payment_type===selectNavField);

  const handleSelect = (eventKey) => {
    setSelectNavField(eventKey);
  };

  return(
    <>
      {selectedItemField.map((i,index) =>
        Object.keys(i.fields).map( (fi, index) => {
          if (fi==='beneficiary_first_name' || fi==='beneficiary_last_name' || fi==='beneficiary_company_name') {
            return <FieldComp key={index} fieldKey={fi} fieldValue={i.fields[fi]}/>;
          }
        }))}
      <Nav variant="pills" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="priority">Priority</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="regular">Regular</Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedAndFiltredSecondSec.map((i,index) =>
        Object.keys(i.fields).map( (fi, index) => {
          if (fi!=='beneficiary_first_name' && fi!=='beneficiary_last_name' && fi!=='beneficiary_company_name') {
            return <FieldComp key={index} fieldKey={fi} fieldValue={i.fields[fi]}/>;
          }
        }))}
      <Button type="submit" className="btn btn-primary pull-right">Add</Button>
    </>
  );
};

export default SelectionFieldComp;
