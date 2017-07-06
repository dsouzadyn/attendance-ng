import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulterselectorComponent } from './defaulterselector.component';

describe('DefaulterselectorComponent', () => {
  let component: DefaulterselectorComponent;
  let fixture: ComponentFixture<DefaulterselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaulterselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaulterselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
