import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CthdComponent } from './cthd.component';

describe('CthdComponent', () => {
  let component: CthdComponent;
  let fixture: ComponentFixture<CthdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CthdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CthdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
