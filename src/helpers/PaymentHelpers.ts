class PaymentHelpers {
  private registryFieldsLabels: string[];

  constructor() {
    this.registryFieldsLabels = [
      "beneficiary_first_name",
      "beneficiary_last_name",
      "beneficiary_company_name",
    ];
  }

  extractBeneficiaryTypes(payments: payment[]): string[] {
    let list: string[] = [];
    payments.forEach((payment) => {
      !list.includes(payment.beneficiary_entity_type) &&
        list.push(payment.beneficiary_entity_type);
    });
    return list;
  }

  extractAvailablePaymentSections(
    beneficiaryType: string,
    payments: payment[]
  ): payment[] {
    const PaymentSections: payment[] = payments.filter(
      (payment) => payment.beneficiary_entity_type === beneficiaryType
    );
    return PaymentSections;
  }

  extractRegistryFields(paymentsSections: payment[]): inputField[] {
    let registryFields: inputField[] = [];

    paymentsSections.forEach((section) => {
      let fields: payment_fields = section.fields;
      type fieldsKey = keyof typeof fields;

      this.registryFieldsLabels.forEach((label: string) => {
        fields[label as fieldsKey] &&
          registryFields.push({
            label: label,
            validation: fields[label as fieldsKey] as string,
          });
      });
    });

    return registryFields.length > 0 ? registryFields : [];
  }

  extractSectionFields(paymentsSection: payment): inputField[] {
    let sectionFields: inputField[] = [];
    let tempSectionFields = Object.entries(paymentsSection.fields).filter(
      (field: [string, string]) => !this.registryFieldsLabels.includes(field[0])
    );

    sectionFields = tempSectionFields.map((field: [string, string]) => {
      return {
        label: field[0],
        validation: field[1],
      };
    });

    return sectionFields;
  }
}

export default new PaymentHelpers();
