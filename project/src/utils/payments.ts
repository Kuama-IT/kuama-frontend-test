interface JsonOption {
    beneficiary_entity_type: string,
    payment_type: string,
    fields: any
}

const PRIORITY_FIELDS = [
    "beneficiary_first_name",
    "beneficiary_last_name",
    "beneficiary_company_name",
]

function formatPaymentEntityOptionsResponse(data :JsonOption[]) {
    if(data.length > 0) {

        let parsedData:any = {};

        data.forEach(item => {
            if(!parsedData[item.beneficiary_entity_type]) {
                parsedData[item.beneficiary_entity_type] = {};
            }

            parsedData[item.beneficiary_entity_type][item.payment_type] = item.fields;
        });

        return parsedData;
    } else return [];
}

export {
    PRIORITY_FIELDS,
    formatPaymentEntityOptionsResponse,
}
