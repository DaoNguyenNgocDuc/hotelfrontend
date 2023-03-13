import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtpdpComponent } from './ctpdp.component';

describe('CtpdpComponent', () => {
  let component: CtpdpComponent;
  let fixture: ComponentFixture<CtpdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtpdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtpdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
