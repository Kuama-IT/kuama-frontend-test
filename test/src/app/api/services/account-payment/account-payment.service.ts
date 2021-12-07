import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountPaymentService {
  private paymentDetails = new BehaviorSubject<object[]>([
    {
      "payment_type": "priority",
      "beneficiary_entity_type": "individual",
      "fields": {
        "beneficiary_last_name": "^.{1,255}",
        "beneficiary_address": "^.{1,255}",
        "iban": "([A-Z0-9]\\s*){15,34}",
        "beneficiary_city": "^.{1,255}",
        "beneficiary_first_name": "^.{1,255}",
        "bic_swift": "^[0-9A-Z]{8}$|^[0-9A-Z]{11}$"
      }
    },
    {
      "payment_type": "priority",
      "beneficiary_entity_type": "company",
      "fields": {
        "beneficiary_company_name": "^.{1,255}",
        "beneficiary_address": "^.{1,255}",
        "iban": "([A-Z0-9]\\s*){15,34}",
        "beneficiary_city": "^.{1,255}",
        "bic_swift": "^[0-9A-Z]{8}$|^[0-9A-Z]{11}$"
      }
    },
    {
      "payment_type": "regular",
      "beneficiary_entity_type": "individual",
      "fields": {
        "iban": "([A-Z0-9]\\s*){15,34}"
      }
    },
    {
      "payment_type": "regular",
      "beneficiary_entity_type": "company",
      "fields": {
        "iban": "([A-Z0-9]\\s*){15,34}"
      }
    }
  ]);

  private paymentDetails$ = this.paymentDetails.asObservable();

  constructor() {
  }

  getPaymentDetails(): Observable<any[]> {
    return this.paymentDetails$
  }
}
