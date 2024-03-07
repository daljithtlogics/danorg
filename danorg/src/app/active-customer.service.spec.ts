import { TestBed } from '@angular/core/testing';

import { ActiveCustomerService } from './active-customer.service';

describe('ActiveCustomerService', () => {
  let service: ActiveCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
