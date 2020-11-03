import { TestBed } from '@angular/core/testing';

import { CallEbayService } from './call-ebay.service';

describe('CallEbayService', () => {
  let service: CallEbayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallEbayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
