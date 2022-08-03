import React from 'react';
import PaymentEntityForm from './components/PaymentEntityForm/PaymentEntityForm';
import { PaymentProvider } from './utils/payment-context/payments-context';

function App() {
    return (
        <div>
            <h1 className='text-xl text-center font-bold border-b border-blue-200 p-4'>
                Kuama frontend test - Zambon Tommaso
            </h1>
            <PaymentProvider>
                <PaymentEntityForm />
            </PaymentProvider>
        </div>
    );
}

export default App;
