import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuKiemTraComponent } from './phieu-kiem-tra.component';

describe('PhieuKiemTraComponent', () => {
  let component: PhieuKiemTraComponent;
  let fixture: ComponentFixture<PhieuKiemTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuKiemTraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuKiemTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
