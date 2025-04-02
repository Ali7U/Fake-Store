import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categories, Category } from '../main/interfaces/categories';
import { Observable } from 'rxjs';
import { Product } from '../main/interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: number) {
    return this.http.get<Categories>(`${this.apiUrl}/categories/${id}`);
  }

  addCategory(category: Category): Observable<Categories> {
    return this.http.post<Categories>(`${this.apiUrl}/categories/`, category);
  }

  getAllProductsByCategory(id: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${id}/products`);
  }
}
