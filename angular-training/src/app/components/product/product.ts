import {Component, signal, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../service/auth-service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {AddProductSheet} from '../add-product-sheet/add-product-sheet';
import {ProductService} from '../../service/product-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddTodoSheetComponent} from '../add-todo-sheet/add-todo-sheet';


export interface Product{
  id?:number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  styleUrl: './product.css',
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatDialogModule, CurrencyPipe],
})
export class ProductComponent implements OnInit{
  auth = inject(AuthService);
  dialog = inject(MatDialog);
  productService = inject(ProductService);
  snackBar = inject(MatSnackBar);

  productList = signal<Product[]>([]);
  openSheet(){
    const sheetRef = this.dialog.open(AddProductSheet);
    sheetRef.afterClosed().subscribe(product => {
      if (!product) return;

      this.productService.addProduct(product).subscribe({
        next: saved => {
          this.productList.update(list => [...list,saved]);
          this.snackBar.open(
            'Product created successfully ✅',
            'OK',
            { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' }
          );
        },
        error: () => {
          this.snackBar.open('Create failed ❌', 'Close', { duration: 3000 });
        }
      })
    });
  }
  ngOnInit() {
    this.productService.getProductList().subscribe(data => {
      this.productList.set(data);
    });
  }
  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(() => {
      this.productList.update(list =>
        list.filter(todo => todo.id !== id)
      );
      this.snackBar.open(
        'Delete successfully ✅',
        'OK',
        { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' }
      );
    });
  }
  editProduct(id: number){
    const editingProduct = this.productList().find(t => t.id === id);
    if(!editingProduct) return;
    const sheetRef = this.dialog.open(AddProductSheet, {data:editingProduct});
    sheetRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.productService.updateProduct(id, result).subscribe(updated => {
        this.productList.update(list =>
          list.map(p =>
            p.id === updated.id ? updated : p
          )
        );
        this.snackBar.open(
          'Product updated successfully ✏️',
          'OK',
          { duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      });
    });
  }
}
