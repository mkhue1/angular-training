import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../components/product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private  baseURL = "http://localhost:8080/product"
  private httpClient = inject(HttpClient)

  getProductList() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseURL)
  }

  addProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.baseURL, product)
  }

  updateProduct(id : number,product: Partial<Product>): Observable<Product>{
    return this.httpClient.put<Product>(`${this.baseURL}/${id}`, product)
  }

  deleteProduct(id : number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`)
  }
}
