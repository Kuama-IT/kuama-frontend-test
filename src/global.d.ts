interface detailsDto {
  details: payment[];
}

interface payment_fields {
  iban: string;
  beneficiary_last_name?: string;
  beneficiary_address?: string;
  beneficiary_city?: string;
  beneficiary_first_name?: string;
  bic_swift?: string;
  beneficiary_company_name?: string;
}
interface payment {
  payment_type: string;
  beneficiary_entity_type: string;
  fields: payment_fields;
}

interface inputField {
  label: string;
  validation: string;
}
