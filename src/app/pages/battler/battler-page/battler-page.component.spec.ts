import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlerPageComponent } from './battler-page.component';
import { BattlerGameModule } from 'src/app/components';
import { NgxsModule } from '@ngxs/store';
import { BattlerState } from 'src/app/store/battler';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BattlerPageComponent', () => {
  let component: BattlerPageComponent;
  let fixture: ComponentFixture<BattlerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BattlerGameModule,
        NgxsModule.forRoot([BattlerState]),
        HttpClientTestingModule,
      ],
      declarations: [BattlerPageComponent],
    });
    fixture = TestBed.createComponent(BattlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container h1')?.textContent).toContain(
      'Star wars battler',
    );
  });
});
