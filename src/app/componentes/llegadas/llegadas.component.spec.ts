import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlegadasComponent } from './llegadas.component';

describe('LlegadasComponent', () => {
  let component: LlegadasComponent;
  let fixture: ComponentFixture<LlegadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlegadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlegadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
