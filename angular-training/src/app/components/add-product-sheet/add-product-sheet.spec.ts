import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSheet } from './add-product-sheet';

describe('AddProductSheet', () => {
  let component: AddProductSheet;
  let fixture: ComponentFixture<AddProductSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
