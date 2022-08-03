import React from 'react';
import { usePayments } from '../../utils/payment-context/payments-context';
import { PRIORITY_FIELDS } from '../../utils/payments';
import FormField from './FormField';

const FormFields = ({displayPriority= false}) => {

    const {selected_beneficiary_type, selected_payment_type, payment_entity_options} = usePayments();

    const displayFields = () => {
        return Object.keys(payment_entity_options[selected_beneficiary_type][selected_payment_type]).map((field,i) => {

            let displayCondition = displayPriority ? 
                PRIORITY_FIELDS.some(priority_field => priority_field === field) :
                !PRIORITY_FIELDS.some(priority_field => priority_field === field);

            if(displayCondition) {
                return (
                    <FormField field={field} key={i}/>
                );
            }
            
            return null;
        });
    }

    if(selected_payment_type && selected_beneficiary_type)
        return (
            <div>
                {displayFields()}
            </div>
        ); 
    else return null;
};

export default FormFields;
