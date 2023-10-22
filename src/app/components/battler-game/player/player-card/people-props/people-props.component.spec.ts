import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePropsComponent } from './people-props.component';

describe('PeoplePropsComponent', () => {
  let component: PeoplePropsComponent;
  let fixture: ComponentFixture<PeoplePropsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeoplePropsComponent],
    });
    fixture = TestBed.createComponent(PeoplePropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
