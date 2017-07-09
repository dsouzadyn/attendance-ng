import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyserHomeComponent } from './analyser-home.component';

describe('AnalyserHomeComponent', () => {
  let component: AnalyserHomeComponent;
  let fixture: ComponentFixture<AnalyserHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyserHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
