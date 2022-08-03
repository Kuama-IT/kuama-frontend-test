import React, {useState, useEffect} from 'react';
import { usePayments } from '../../utils/payment-context/payments-context';
import { doGetPaymentOptions } from '../../logic/__mocks__/payments';
import { formatPaymentEntityOptionsResponse } from '../../utils/payments';
import Loading from '../UI/Loading';
import Form from './Form';

const PaymentEntityForm = () => {

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {setPaymentEntityOptions} = usePayments();

    const loadPaymentOptions = async () => {
        setLoading(true);
        let response = await doGetPaymentOptions();
        if(response) {
            setPaymentEntityOptions(formatPaymentEntityOptionsResponse(response.details));
        }
        setLoading(false);
    }

    const handleAdd = (data: FormData) => {
        console.log([...data]);
        setSubmitted(true);
    }

    useEffect(() => {
        loadPaymentOptions();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center '>
            {loading 
            ? <Loading />
            : submitted 
                ? <div>Beneficiary added</div>
                : <Form onSubmit={handleAdd}/>
            }
        </div>
    );
};

export default PaymentEntityForm;
