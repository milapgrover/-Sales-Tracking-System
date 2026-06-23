import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
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
    loadComponent: () => import('./pages/products/products').then(m => m.Products)   
  },

  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders').then(m => m.Orders)
  },

  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory').then(m => m.Inventory)
  },

  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications/notifications').then(m => m.Notifications)
  },



];