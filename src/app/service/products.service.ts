import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Create, Product } from '../main/interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProducts(query:string = '') {
    return this.http.get<Product[]>(`${this.apiUrl}/products${query}`);
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
  }

  createProduct(product: Create) {
    return this.http.post<Create>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }
}
