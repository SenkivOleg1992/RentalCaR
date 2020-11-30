import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CatalogAutoComponent } from './pages/catalog-auto/catalog-auto.component';
import { PriceComponent } from './pages/price/price.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SalesDetailsComponent } from './pages/sales-details/sales-details.component';
import { RentalConditionsComponent } from './pages/rental-conditions/rental-conditions.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AutoDetailsComponent } from './pages/auto-details/auto-details.component';


import { AdminComponent } from './admin/admin.component';
import { AdminAutoComponent } from './admin/admin-auto/admin-auto.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSalesComponent } from './admin/admin-sales/admin-sales.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'catalog-auto', component: CatalogAutoComponent },
  // { path: 'menu/:category/:id', component: AutoDetailsComponent },
  { path: 'price', component: PriceComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'sale/:id', component: SalesDetailsComponent },
  { path: 'rental-conditions', component: RentalConditionsComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard ], children: [
    { path: '', pathMatch: 'full', redirectTo: 'category'},
    { path: 'auto', component: AdminAutoComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'sales', component: AdminSalesComponent },
    { path: 'orders', component: AdminOrdersComponent }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
