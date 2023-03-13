import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiThanhToanComponent } from './loai-thanh-toan.component';

describe('LoaiThanhToanComponent', () => {
  let component: LoaiThanhToanComponent;
  let fixture: ComponentFixture<LoaiThanhToanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiThanhToanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaiThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
