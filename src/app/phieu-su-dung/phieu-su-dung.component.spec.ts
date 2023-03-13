import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuSuDungComponent } from './phieu-su-dung.component';

describe('PhieuSuDungComponent', () => {
  let component: PhieuSuDungComponent;
  let fixture: ComponentFixture<PhieuSuDungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuSuDungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
