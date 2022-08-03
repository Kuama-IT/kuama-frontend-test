import { types } from "./payments-actions";
import { PaymentsContextData } from "./payments-context";

export const paymentContextDefaultValue: PaymentsContextData = {
    payment_entity_options: {},
    selected_beneficiary_type: "",
    selected_payment_type: "",
    setPaymentEntityOptions: () => null,
    setSelectedBeneficiaryType: () => null,
    setSelectedPaymentType: () => null,
    resetSelected: () => null,
};

function PaymentsReducer(state: any, action: any): PaymentsContextData {
    switch (action.type) {
        case types.PAYMENTS_SET_PAYMENT_OPTIONS:
            return {
                ...state,
                payment_entity_options: action.options,
            };
        case types.PAYMENTS_SET_SELECTED_BENEFICIARY_TYPE:
            return {
                ...state,
                selected_beneficiary_type: action.beneficiary,
            };
        case types.PAYMENTS_SET_SELECTED_PAYMENT_TYPE:
            return {
                ...state,
                selected_payment_type: action.payment_type,
            };
        case types.PAYMENTS_RESET_SELECTED:
            return {
                ...state,
                selected_beneficiary_type: "",
                selected_payment_type: "",
            }
        default:
            throw new Error("Unhandled action type: " + action.type);
    }
}

export default PaymentsReducer;
