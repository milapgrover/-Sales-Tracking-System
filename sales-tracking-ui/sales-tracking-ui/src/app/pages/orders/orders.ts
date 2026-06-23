import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { ProductService } from '../../core/services/product';
import { OrderService } from '../../core/services/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders implements OnInit {

  private http = inject(HttpClient);

  private productService =
    inject(ProductService);

  private orderService =
    inject(OrderService);

  orders: any[] = [];

  products: any[] = [];

  showOrderForm = false;

  apiUrl =
    'http://localhost:8080/api/orders';

  orderRequest = {

    customerName: '',

    items: [
      {
        productId: 0,
        quantity: 1
      }
    ]

  };

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders(): void {

    this.http
      .get<any[]>(this.apiUrl)
      .subscribe({

        next: (response) => {

          this.orders = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  get totalRevenue(): number {

    return this.orders.reduce(
      (sum, order) =>
        sum + order.totalAmount,
      0
    );

  }

  openOrderForm(): void {

    this.showOrderForm = true;

    this.productService
      .getAllProducts()
      .subscribe({

        next: (data) => {

          this.products = data;

        }

      });

  }

  closeOrderForm(): void {

    this.showOrderForm = false;

  }

  createOrder(): void {

    this.orderService
      .createOrder(
        this.orderRequest
      )
      .subscribe({

        next: () => {

          alert(
            'Order Created Successfully'
          );

          this.showOrderForm = false;

          this.orderRequest = {

            customerName: '',

            items: [
              {
                productId: 0,
                quantity: 1
              }
            ]

          };

          this.loadOrders();

        },

        error: (err) => {

          console.error(err);

          alert(
            'Failed To Create Order'
          );

        }

      });

  }

}