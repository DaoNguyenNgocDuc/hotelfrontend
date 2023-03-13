import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuDenBuComponent } from './phieu-den-bu.component';

describe('PhieuDenBuComponent', () => {
  let component: PhieuDenBuComponent;
  let fixture: ComponentFixture<PhieuDenBuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuDenBuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuDenBuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
