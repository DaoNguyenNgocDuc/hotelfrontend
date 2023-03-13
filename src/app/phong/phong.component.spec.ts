import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongComponent } from './phong.component';

describe('PhongComponent', () => {
  let component: PhongComponent;
  let fixture: ComponentFixture<PhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
