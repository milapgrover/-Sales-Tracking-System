import {
  Component,
  OnInit,
  inject
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
export class Products implements OnInit {

  private productService =
    inject(ProductService);

  products: Product[] = [];

  searchText = '';

  ngOnInit(): void {

    this.loadProducts();
  }

  loadProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  getTotalStock(): number {

    return this.products
      .reduce(
        (sum, product) =>
          sum + product.stockQuantity,
        0
      );
  }

  getLowStockCount(): number {

    return this.products
      .filter(
        product =>
          product.stockQuantity
          <=
          product.minimumStock
      ).length;
  }

  filteredProducts(): Product[] {

    return this.products.filter(
      product =>
        product.productName
          .toLowerCase()
          .includes(
            this.searchText
              .toLowerCase()
          )
    );
  }

  deleteProduct(
    id: number
  ): void {

    if(
      !confirm(
        'Delete this product?'
      )
    ) {
      return;
    }

    this.productService
      .deleteProduct(id)
      .subscribe({
        next: () => {
          this.loadProducts();
        }
      });
  }
}