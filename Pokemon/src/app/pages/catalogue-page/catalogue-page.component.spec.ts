import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePageComponent } from './catalogue-page.component';

describe('CataloguePageComponent', () => {
  let component: CataloguePageComponent;
  let fixture: ComponentFixture<CataloguePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CataloguePageComponent]
    });
    fixture = TestBed.createComponent(CataloguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
