import React,{ useState } from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import './App.css';
import Data from './data/input_data.json';
import DropdownComp from './components/DropdownComp';
import SelectionFieldComp from './components/SelectionFieldComp';

const App = () => {
  const [selectedItemField, setSelectedItemFiel] = useState(null);

  const handleItemSelection = (item) => {
    setSelectedItemFiel(Data.details.filter(i => i.beneficiary_entity_type===item));
  };

  return (
    <div className="container">
      <Row className="justify-content-md-center">
        <Col md={{ span: 4 }}>
          <Form>
            <DropdownComp handleSelection={handleItemSelection} />
            {selectedItemField && <SelectionFieldComp data={Data} selectedItemField={selectedItemField} />}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default App;
