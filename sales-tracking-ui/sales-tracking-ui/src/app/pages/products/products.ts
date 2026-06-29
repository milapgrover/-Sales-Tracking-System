import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {

  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  searchText = '';

  totalStock = computed(() =>
    this.products().reduce(
      (sum, product) => sum + product.stockQuantity,
      0
    )
  );

  lowStockCount = computed(() =>
    this.products().filter(
      product => product.stockQuantity <= product.minimumStock
    ).length
  );

  filteredProducts = computed(() =>
    this.products().filter(
      product =>
        product.productName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    )
  );

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getAllProducts()
      .subscribe(data => {
        this.products.set(data);
      });
  }

  deleteProduct(id: number): void {

    if (!confirm('Delete this product?')) {
      return;
    }

    this.productService
      .deleteProduct(id)
      .subscribe(() => {
        this.loadProducts();
      });

  }

}