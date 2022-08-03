import React from 'react';
import { usePayments } from '../../utils/payment-context/payments-context';
import Button from '../UI/Button';
import FormFields from './FormFields';
import SelectBeneficiary from './SelectBeneficiary';
import SelectPaymentType from './SelectPaymentType';

type Props = {
    onSubmit: (data: FormData) => void,
}

const Form = ({onSubmit}: Props) => {

    const { selected_beneficiary_type, selected_payment_type, resetSelected} = usePayments();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit(formData);
    };

    const handleCancel = () => {
        resetSelected();
    }

    return (
        <form
            className="p-4 rounded-lg min-w-[300px]"
            onSubmit={handleSubmit}
        >
            <SelectBeneficiary />

            <FormFields displayPriority={true} />

            <SelectPaymentType />
            
            <FormFields />

            {selected_beneficiary_type && selected_payment_type &&
                <div className="flex flex-row justify-between mt-4">
                    <button type='button' 
                        onClick={handleCancel}
                        className="font-medium cursor-pointer hover:font-bold">Cancel</button>
                    <Button type='submit'>Add</Button>
                </div>
            }
        </form>
    );
};

export default Form;
