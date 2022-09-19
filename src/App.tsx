import React, { useEffect, useState } from "react";
import PaymentHelpers from "./helpers/PaymentHelpers";
import PaymentsAPI from "./api/PaymentsAPI";

//Components
import CustomDropDown from "./components/DropDown/DropDown";
import RegistrySection from "./components/RegistrySection/RegistrySection";
import Tabs from "./components/Tabs/Tabs";

//Styles
import "./App.scss";

const App: React.FC = () => {
  const [registryFields, setRegistryFields] = useState<inputField[]>([]);
  const [beneficiaryTypes, setBeneficiaryTypes] = useState<string[]>([]);
  const [paymentSections, setPaymentSections] = useState<payment[]>([]);
  const [paymentsList, setPaymentsList] = useState<payment[]>([]);

  useEffect(() => {
    PaymentsAPI.getPayments()
      .then((data) => {
        setPaymentsList(data.details);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (paymentsList.length > 0) {
      setBeneficiaryTypes(PaymentHelpers.extractBeneficiaryTypes(paymentsList));
    }
  }, [paymentsList]);

  useEffect(() => {
    if (paymentSections.length > 0) {
      setRegistryFields(PaymentHelpers.extractRegistryFields(paymentSections));
    }
  }, [paymentSections]);

  const handleBeneficiaryTypeChange = (value: string) => {
    setPaymentSections(
      PaymentHelpers.extractAvailablePaymentSections(value, paymentsList)
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="form-wrapper">
          <CustomDropDown
            options={beneficiaryTypes}
            onChange={handleBeneficiaryTypeChange}
          />
          {registryFields.length > 0 && (
            <RegistrySection fields={registryFields} />
          )}
          {paymentSections.length > 0 && (
            <Tabs paymentSections={paymentSections} />
          )}
          {paymentSections.length > 0 && (
            <div className="buttons-wrapper">
              <button
                className="button_alt"
                onClick={() => console.log("//TODO")}
              >
                Cancel
              </button>
              <button className="button" onClick={() => console.log("//TODO")}>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
