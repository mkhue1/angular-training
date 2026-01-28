import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../product/product';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-add-product-sheet',
  templateUrl: './add-product-sheet.html',
  styleUrl: './add-product-sheet.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class AddProductSheet implements  OnInit{
  private sheetRef = inject(MatDialogRef<AddProductSheet>);
  productList = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  submit() {
    if (this.productList.invalid) return;
    const newProduct = {
      productName: this.productList.value.productName!,
      price: this.productList.value.price!,
      description: this.productList.value.description!,
      quantity: this.productList.value.quantity!,
    };
    this.sheetRef.close(newProduct);
  }

  cancel() {
    this.sheetRef.close();
  }

  ngOnInit() {
    if (this.data) {
      this.productList.patchValue({
        productName: this.data.productName,
        price: this.data.price,
        description: this.data.description,
        quantity: this.data.quantity,
      });
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {
  }
}
