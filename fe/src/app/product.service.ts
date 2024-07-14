import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3320/products');
  }

  getProductById(id: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3320/products/' + id);
  }

  createProduct(post: Product): Observable<Product[]> {
    return this.http.post<Product[]>('http://localhost:3320/products/store', post)
  }

}
