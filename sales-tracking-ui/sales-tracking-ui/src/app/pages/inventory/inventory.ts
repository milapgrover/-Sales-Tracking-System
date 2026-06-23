import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventorySummary } from '../../core/models/inventory.model';
import { Product } from '../../core/models/product.model';
import { InventoryService } from '../../core/services/inventory';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory implements OnInit {

  private inventoryService = inject(InventoryService);

  summary?: InventorySummary;

  lowStockProducts: Product[] = [];

  ngOnInit(): void {

    this.loadInventorySummary();
    this.loadLowStockProducts();
  }

  loadInventorySummary(): void {

    this.inventoryService
      .getInventorySummary()
      .subscribe({
        next: (data) => {
          this.summary = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  loadLowStockProducts(): void {

    this.inventoryService
      .getLowStockProducts()
      .subscribe({
        next: (data) => {
          this.lowStockProducts = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}