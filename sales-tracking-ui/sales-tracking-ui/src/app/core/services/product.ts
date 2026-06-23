import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/products';

  getAllProducts():
    Observable<Product[]> {

    return this.http.get<Product[]>(
      this.apiUrl
    );
  }

  deleteProduct(
    id: number
  ): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { responseType: 'text' }
    );
  }
}