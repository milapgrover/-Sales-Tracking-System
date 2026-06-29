import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { Inventory} from '../models/inventory.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient)
  getInventoryService() : Observable<Inventory>
  {
    return this.http.get<Inventory>
    (
      `${environment.apiUrl}/inventory/summary`
    )
  }
  getLowStockProducts() : Observable<Product[]>
  {
    return this.http.get<Product[]>
    (
      `${environment.apiUrl}/inventory/low-stock`
    )
  }
}