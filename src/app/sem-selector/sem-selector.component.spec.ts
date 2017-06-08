import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemSelectorComponent } from './sem-selector.component';

describe('SemSelectorComponent', () => {
  let component: SemSelectorComponent;
  let fixture: ComponentFixture<SemSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
