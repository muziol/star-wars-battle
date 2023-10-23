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
    component.properties = {
      height: 100,
      mass: 50,
      name: 'Test',
      hair_color: 'brown',
      homeworld: 'Test world',
      url: 'testurl',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mass equal properties.mass', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul li strong')?.textContent).toContain(
      'Mass: 50',
    );
  });
});
