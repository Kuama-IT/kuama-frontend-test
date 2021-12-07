import {Component, OnInit} from '@angular/core';
import {AccountPaymentService} from "../../../api/services/account-payment/account-payment.service";


@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit {


  paymentDetails: any = [];
  paymentInformation: any = [];
  inputDetails: any = [];
  selectedCompanyType: string | undefined;

  constructor(private ac: AccountPaymentService) {
  }

  ngOnInit(): void {

    this.ac.getPaymentDetails().subscribe((data: any) => {
      this.paymentDetails = data;
      for (let d of this.paymentDetails) {
        for (const key of Object.keys(d.fields)) {
          this.inputDetails.push(key);
        }
      }
    })
  }

  getCompanyType(e: any) {
    this.selectedCompanyType = e.target.value;
    this.paymentInformation = this.paymentDetails.filter((s: { beneficiary_entity_type: string | any[] }) => s.beneficiary_entity_type.includes(e.target.value));
  }
}
