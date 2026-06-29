import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product';
import { OrderService } from '../../core/services/order';
import type { Product } from '../../core/models/product.model';
import type { Order } from '../../core/models/order.model';

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
export class OrdersComponent  implements OnInit{
  private productService  = inject(ProductService)
  private orderService   = inject(OrderService)
  products = signal<Product[]>([])
  orders = signal<Order[]>([])
  showOrderForm  = signal(false)
  orderRequest = {
    customerName : '',
    items :[
      {
      productId : 0,
      quantity : 1
      }
    ]
  }
  totalRevenue  = computed(()=>(this.orders().reduce((sum , order)=>sum + order.totalAmount , 0 )));
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders():void
  {
    this.orderService.getAllOrders().subscribe(data =>
    {
      this.orders.set(data)
    }
    ) 
  }
  openOrderForm() : void
  {
    this.showOrderForm.set(true)
    this.productService.getAllProducts().subscribe(data => this.products.set(data))
  }
  closeOrderForm() : void
  {
    this.showOrderForm.set(false)
  }
  createOrder():void
  {
    this.orderService.createOrder(this.orderRequest).subscribe(()=>
    {
      alert('Order Created Successfully');
      this.showOrderForm.set(false);
      this.orderRequest = {
        customerName : "",
        items : [
          {
          productId : 0,
      quantity : 1
          }
        ]
      };
      this.loadOrders();
    })
  }
}