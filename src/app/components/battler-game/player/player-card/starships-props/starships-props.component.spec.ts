import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsPropsComponent } from './starships-props.component';

describe('StarshipsPropsComponent', () => {
  let component: StarshipsPropsComponent;
  let fixture: ComponentFixture<StarshipsPropsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarshipsPropsComponent],
    });
    fixture = TestBed.createComponent(StarshipsPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
