import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAutoComponent } from './catalog-auto.component';

describe('CatalogAutoComponent', () => {
  let component: CatalogAutoComponent;
  let fixture: ComponentFixture<CatalogAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
