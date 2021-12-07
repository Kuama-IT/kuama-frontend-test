import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountPaymentComponent} from './account-payment.component';
import {AddBeneficiaryComponent} from "./add-beneficiary/add-beneficiary.component";

const routes: Routes = [
  {
    path: '',
    component: AccountPaymentComponent,
    children: [
      {
        path: '',
        component: AddBeneficiaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPaymentRoutingModule {
}
