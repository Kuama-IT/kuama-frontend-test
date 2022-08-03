import React from 'react';
import { usePayments } from '../../utils/payment-context/payments-context';

const SelectPaymentType = () => {

    const {selected_beneficiary_type, payment_entity_options,
        selected_payment_type, setSelectedPaymentType} = usePayments();

    const displayPaymentTypes = () => {
        if(selected_beneficiary_type !== "") {
            return Object.keys(payment_entity_options[selected_beneficiary_type]).map((payment_type, i) => 
                <div key={i} 
                    className={`cursor-pointer select-none p-1 ${selected_payment_type === payment_type && 'border-b-2 border-blue-600'}`}
                    onClick={() => setSelectedPaymentType(payment_type)}>{payment_type}</div>
            );
        }
    }

    if(selected_beneficiary_type)
    return (
        <div>
            <div className='flex flex-row justify-around mt-4'>
                {displayPaymentTypes()}
            </div>
        </div>
    );
    else return null;
};

export default SelectPaymentType;
