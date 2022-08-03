import React from 'react';
import { usePayments } from '../../utils/payment-context/payments-context';
import Select from '../UI/Select';

type Props = {
    [props:string]: any,
}

const SelectBeneficiary = ({...props}: Props) => {

    const { payment_entity_options,
        selected_beneficiary_type, setSelectedBeneficiaryType,
        selected_payment_type, setSelectedPaymentType} = usePayments();

    const onBeneficiaryChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setSelectedBeneficiaryType(val);
        if(selected_payment_type === "") {
            setSelectedPaymentType(Object.keys(payment_entity_options[val])[0]);
        }
    }

    const getPaymentOptions = () => {
        return Object.keys(payment_entity_options).map((option, i) => 
            <option key={i} value={option}>{option}</option>
        );
    }

    return (
        <div className='mb-4 select-none'>
            <div className='text-sm'>Select your beneficiary type</div>

            <Select onChange={onBeneficiaryChange} 
                name='beneficiary_entity_type'
                value={selected_beneficiary_type}
                {...props}>

                <option value=''>Select a beneficiary type</option>

                {getPaymentOptions()}

            </Select>

        </div>
    );
};

export default SelectBeneficiary;
