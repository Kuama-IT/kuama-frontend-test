import React, { useState } from 'react';
import { usePayments } from '../../utils/payment-context/payments-context';
import Input from '../UI/Input';

type Props = {
    field:string
}

const FormField = ({field} : Props) => {

    const [hasValue, setHasValue] = useState(false);

    const {payment_entity_options, selected_beneficiary_type, selected_payment_type} = usePayments();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        setHasValue(value !== "");
    }

    return (
        <div className='my-1 relative select-none'>
            {hasValue && <label className='absolute top-0 left-2 text-[9px] uppercase text-gray-500 font-medium'>{field.replaceAll('_', " ")}</label>}
            <Input name={field} 
                onChange={handleChange}
                required
                pattern={payment_entity_options[selected_beneficiary_type][selected_payment_type][field]}
                placeholder={field.replaceAll('_', ' ')} />
        </div>
    );
};

export default FormField;
