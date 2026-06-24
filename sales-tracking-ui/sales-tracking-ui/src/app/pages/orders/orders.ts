import {
  Component,
  OnInit,
  computed,
  inject,
  signal
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
export class OrdersComponent implements OnInit {

 private http = inject(HttpClient);

  private productService =
    inject(ProductService);

  private orderService =
    inject(OrderService);

  orders = signal<any[]>([]);

  products = signal<any[]>([]);

  showOrderForm = signal(false);

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

  totalRevenue = computed(() =>

    this.orders().reduce(
      (sum, order) =>
        sum + order.totalAmount,
      0
    )

  );

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders(): void {

    this.http
      .get<any[]>(this.apiUrl)
      .subscribe(data => {

        this.orders.set(data);

      });

  }

  openOrderForm(): void {

    this.showOrderForm.set(true);

    this.productService
      .getAllProducts()
      .subscribe(data => {

        this.products.set(data);

      });

  }

  closeOrderForm(): void {

    this.showOrderForm.set(false);

  }

  createOrder(): void {

    this.orderService
      .createOrder(this.orderRequest)
      .subscribe(() => {

        alert(
          'Order Created Successfully'
        );

        this.showOrderForm.set(false);

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

      });

  }

}