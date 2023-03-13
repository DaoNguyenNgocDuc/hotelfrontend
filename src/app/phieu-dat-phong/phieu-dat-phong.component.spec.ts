import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuDatPhongComponent } from './phieu-dat-phong.component';

describe('PhieuDatPhongComponent', () => {
  let component: PhieuDatPhongComponent;
  let fixture: ComponentFixture<PhieuDatPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuDatPhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuDatPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
