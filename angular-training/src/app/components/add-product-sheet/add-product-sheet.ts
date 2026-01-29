import {Component, Inject, inject, OnInit, signal} from '@angular/core';
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
  previewImage = signal<string | null>(null);
  productList = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    image: new FormControl('')
  });

  submit() {
    if (this.productList.invalid) return;
    const newProduct = {
      productName: this.productList.value.productName!,
      price: this.productList.value.price!,
      description: this.productList.value.description!,
      quantity: this.productList.value.quantity!,
      image: this.previewImage(),
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

      this.previewImage.set(this.data.image);
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // validate type
    if (!file.type.startsWith('image/')) {
      alert('Only image files allowed');
      return;
    }


    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage.set(reader.result as string);
      this.productList.patchValue({
        image: this.previewImage(),
      });
    };

    reader.readAsDataURL(file);
  }
}
