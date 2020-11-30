import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAutoComponent } from './admin-auto.component';

describe('AdminAutoComponent', () => {
  let component: AdminAutoComponent;
  let fixture: ComponentFixture<AdminAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
