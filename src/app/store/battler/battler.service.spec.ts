import { TestBed } from '@angular/core/testing';

import { BattlerService } from './battler.service';

describe('BattlerService', () => {
  let service: BattlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
