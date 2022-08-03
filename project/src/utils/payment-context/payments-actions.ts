const PAYMENTS_SET_PAYMENT_OPTIONS = 'PAYMENTS_SET_PAYMENT_OPTIONS';
const PAYMENTS_SET_SELECTED_BENEFICIARY_TYPE = 'PAYMENTS_SET_SELECTED_BENEFICIARY_TYPE';
const PAYMENTS_SET_SELECTED_PAYMENT_TYPE = 'PAYMENTS_SET_SELECTED_PAYMENT_TYPE';
const PAYMENTS_RESET_SELECTED = 'PAYMENTS_RESET_SELECTED';

export const types = {
    PAYMENTS_SET_PAYMENT_OPTIONS,
    PAYMENTS_SET_SELECTED_BENEFICIARY_TYPE,
    PAYMENTS_SET_SELECTED_PAYMENT_TYPE,
    PAYMENTS_RESET_SELECTED,
}

function setPaymentEntityOptions(options: any) {
    return {
        type: PAYMENTS_SET_PAYMENT_OPTIONS,
        options,
    }
}

function setSelectedBeneficiaryType(beneficiary: string) {
    return {
        type: PAYMENTS_SET_SELECTED_BENEFICIARY_TYPE,
        beneficiary,
    }
}

function setSelectedPaymentType(payment_type: string) {
    return  {
        type: PAYMENTS_SET_SELECTED_PAYMENT_TYPE,
        payment_type,
    }
}

function resetSelected() {
    return {
        type: PAYMENTS_RESET_SELECTED,
    }
}

const actions = {
    setPaymentEntityOptions,
    setSelectedBeneficiaryType,
    setSelectedPaymentType,
    resetSelected
}

export default actions;
