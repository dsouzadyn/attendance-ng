import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulterrecordsComponent } from './defaulterrecords.component';

describe('DefaulterrecordsComponent', () => {
  let component: DefaulterrecordsComponent;
  let fixture: ComponentFixture<DefaulterrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaulterrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaulterrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
