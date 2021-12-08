import {Component, Input, OnInit} from '@angular/core';
import {AccountPaymentService} from "../../../api/services/account-payment/account-payment.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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


  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      beneficiary_entity_type: [null, [Validators.required]],
      fields: this.fb.array([]),
    });

    this.ac.getPaymentDetails().subscribe((data: any) => {
      this.paymentInfo = data;
    })
  }

  getCompanyType(e: any) {
    this.selectedCompanyType = e.target.value;
    const paymentInformation = this.paymentInfo.filter((s: any) => s.beneficiary_entity_type.includes(e.target.value));
    this.fields.clear();
    this.filterData(paymentInformation)
  }


  filterData(data: any) {
    for (const d of data) {
      if (d.beneficiary_entity_type === this.selectedCompanyType && d.payment_type === 'priority') {
        const fields = this.paymentForm.get('fields') as FormArray;
        fields.push(this.fb.group(d.fields));
        this.paymentForm.reset()
      }
    }
  }

  get fields(): FormArray {
    return this.paymentForm.get("fields") as FormArray;
  }
}
