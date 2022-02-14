import React,{ useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';


const items = [ { type:'individual', id:0 }, { type:'company', id:1 } ];

const DropdownComp = ({ handleSelection }) => {
  return (
    <div className="App">
      <FloatingLabel controlId="floatingSelect" label="type">
        <Form.Select aria-label="Floating label select example" onChange={(event) => handleSelection(event.target.value)}>
          <option key = 'blankChoice' hidden value> type </option>
          {items.map((item) => <option value={item.type} key={item.id}>{item.type}</option>)}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default DropdownComp;
