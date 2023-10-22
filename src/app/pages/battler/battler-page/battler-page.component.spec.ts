import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlerPageComponent } from './battler-page.component';

describe('BattlerPageComponent', () => {
  let component: BattlerPageComponent;
  let fixture: ComponentFixture<BattlerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattlerPageComponent],
    });
    fixture = TestBed.createComponent(BattlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
