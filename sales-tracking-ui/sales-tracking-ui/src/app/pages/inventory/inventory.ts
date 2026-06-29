import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../core/models/inventory.model';
import { Product } from '../../core/models/product.model';
import { InventoryService } from '../../core/services/inventory';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class InventoryComponent implements OnInit{
  data : any;
  inventory() {
throw new Error('Method not implemented.');
}
  private inventoryService  = inject(InventoryService);
  summary = signal<Inventory | null>(null)
  lowStockProducts  = signal<Product[]>([])
  ngOnInit(): void {
    this.loadInventorySummary();
   this.loadLowStockProducts(); 
  }
  loadInventorySummary():void
  {
    this.inventoryService.getInventoryService().subscribe(data =>
    {
      this.summary.set(data)
    }
    )
  }
  loadLowStockProducts() : void
  {
    this.inventoryService.getLowStockProducts().subscribe(data =>
    {
      this.lowStockProducts.set(data)
    }
    )
  }
}