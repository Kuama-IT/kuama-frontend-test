import { TestBed } from '@angular/core/testing';

import { AccountPaymentService } from './account-payment.service';

describe('AccountPaymentService', () => {
  let service: AccountPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
