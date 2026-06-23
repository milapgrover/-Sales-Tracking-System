import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import type { InventorySummary } from '../models/inventory.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private http = inject(HttpClient);

  getInventorySummary():
    Observable<InventorySummary> {

    return this.http.get<InventorySummary>(
      `${environment.apiUrl}/inventory/summary`
    );
  }

  getLowStockProducts():
    Observable<Product[]> {

    return this.http.get<Product[]>(
      `${environment.apiUrl}/inventory/low-stock`
    );
  }
}