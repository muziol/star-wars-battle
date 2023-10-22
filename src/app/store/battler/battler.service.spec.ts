import { TestBed } from '@angular/core/testing';

import { BattlerService } from './battler.service';
import { NgxsModule } from '@ngxs/store';
import { BattlerState } from './battler.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BattlerService', () => {
  let service: BattlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([BattlerState]), HttpClientTestingModule],
    });
    service = TestBed.inject(BattlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
