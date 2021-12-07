import {Component, OnInit} from '@angular/core';
import {AccountPaymentService} from "../../../api/services/account-payment/account-payment.service";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit {

  // @ts-ignore
  paymentForm: FormGroup;
  paymentInfo: any = [];
  selectedCompanyType: string | undefined;

  constructor(private ac: AccountPaymentService, private fb: FormBuilder) {
  }

// As I dont understand I should make it fixed or get from json fields I did both

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      fields: this.fb.group({
        bic_swift: ['', [Validators.required]],
        beneficiary_address: ['', [Validators.required]],
        beneficiary_city: ['', [Validators.required]],
        beneficiary_last_name: ['', [Validators.required]],
        beneficiary_first_name: ['', [Validators.required]],
        beneficiary_company_name: ['', [Validators.required]],
        iban: ['', [Validators.required]],
      }),

      //here Ill make FormArray, to add here fields from json
      // fields: this.fb.array([])

    });

    // Getting data form Json
    // this.ac.getPaymentDetails().subscribe((data: any) => {
    //   this.paymentInfo = data;
    // })
  }


  getCompanyType(e: any) {
    this.selectedCompanyType = e.target.value;

    //Here Ill filter data to understand it is individual or company

    //   const paymentInformation = this.paymentInfo.filter((s: any) => s.beneficiary_entity_type.includes(e.target.value));
    //   this.filterData(paymentInformation)
  }


  // filterData(data: any) {

  // and here Ill push in formArray

  //   for (const d of data) {
  //     if (d.beneficiary_entity_type === this.selectedCompanyType && d.payment_type === 'priority') {
  //       this.paymentForm.value.fields.push(d.fields)
  //     }
  //   }
  // }


}
