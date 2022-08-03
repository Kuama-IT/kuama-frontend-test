import React, {useCallback} from 'react';
import actions from './payments-actions';
import PaymentsReducer, { paymentContextDefaultValue } from './payments-reducer';

type PaymentProviderProps = {children: React.ReactNode};

export type PaymentsContextData = {
    payment_entity_options: {
        [beneficiary:string]: {
            [payment_type: string]: {
                [fields:string] : string | undefined
            }
        }
    },
    selected_beneficiary_type: string,
    selected_payment_type: string,
    setPaymentEntityOptions: (options: any) => void,
    setSelectedBeneficiaryType: (beneficiary: string) => void,
    setSelectedPaymentType: (type: string) => void,
    resetSelected: () => void,
}

const PaymentContext = React.createContext<PaymentsContextData>(paymentContextDefaultValue);

function usePaymentContextValue() {

    const [state, dispatch] = React.useReducer(PaymentsReducer, paymentContextDefaultValue);

    const {payment_entity_options, selected_beneficiary_type, selected_payment_type} = state;

    const setPaymentEntityOptions = useCallback((paymentOptions: any) => dispatch(actions.setPaymentEntityOptions(paymentOptions)), []);
    const setSelectedBeneficiaryType = useCallback((beneficiary: string) => dispatch(actions.setSelectedBeneficiaryType(beneficiary)), []);
    const setSelectedPaymentType = useCallback((type:string) => dispatch(actions.setSelectedPaymentType(type)), []);
    const resetSelected = useCallback(() => dispatch(actions.resetSelected()), []);

    return React.useMemo(() => {
        return {
            payment_entity_options, setPaymentEntityOptions,
            selected_beneficiary_type, setSelectedBeneficiaryType,
            selected_payment_type, setSelectedPaymentType,
            resetSelected,
        }
    }, [
        payment_entity_options, setPaymentEntityOptions,
        selected_beneficiary_type, setSelectedBeneficiaryType,
        selected_payment_type, setSelectedPaymentType,
        resetSelected,
    ])
}

function PaymentProvider({children}: PaymentProviderProps) {
    const value = usePaymentContextValue();
    return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}

function usePayments() {
    const context = React.useContext(PaymentContext);
    if(!context)
        new Error('usePayments must be used within a PaymentProvider');
    return context;
}

export {
    PaymentProvider,
    usePayments,
}
