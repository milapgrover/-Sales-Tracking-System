import { DashboardComponent } from './pages/dashboard/dashboard';
import { ProductsComponent } from './pages/products/products';
import { OrdersComponent } from './pages/orders/orders';
import { InventoryComponent } from './pages/inventory/inventory';
import { NotificationsComponent } from './pages/notifications/notifications';
import type { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  }
];