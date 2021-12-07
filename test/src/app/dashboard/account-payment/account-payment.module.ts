import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountPaymentRoutingModule} from './account-payment-routing.module';
import {AccountPaymentComponent} from './account-payment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import {AppModule} from "../../app.module";

@NgModule({
  declarations: [
    AccountPaymentComponent,
    AddBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    AccountPaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AccountPaymentModule {
}
