export enum AppUrls {
  OVERVIEW = `/overview`,
  CURRENT_ACCOUNTS = "/current_accounts",
  OPEN_ACCOUNTS = "open_accounts",

}

export interface DetailsProps {
  payment_type: string;
  beneficiary_entity_type:string;
  fields:FieldsProps;
}

export interface FieldsProps{
   beneficiary_last_name:string;
   beneficiary_address:string;
   iban:string;
   beneficiary_city:string;
   beneficiary_first_name:string;
   bic_swift:string;
}