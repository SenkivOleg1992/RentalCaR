import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from  '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { CatalogAutoComponent } from './pages/catalog-auto/catalog-auto.component';
import { AutoDetailsComponent } from './pages/auto-details/auto-details.component';
import { PriceComponent } from './pages/price/price.component';
import { SalesComponent } from './pages/sales/sales.component';
import { RentalConditionsComponent } from './pages/rental-conditions/rental-conditions.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SalesDetailsComponent } from './pages/sales-details/sales-details.component';

import { AdminComponent } from './admin/admin.component';
import { AdminAutoComponent } from './admin/admin-auto/admin-auto.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSalesComponent } from './admin/admin-sales/admin-sales.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUILoader } from './preloader-config';
import { NgxScrollTopModule } from 'ngx-scrolltop';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SalesComponent,
    SalesDetailsComponent,
    PaymentComponent,
    AdminComponent,
    AdminAutoComponent,
    AdminCategoryComponent,
    AdminSalesComponent,
    AdminOrdersComponent,
    CatalogAutoComponent,
    PriceComponent,
    RentalConditionsComponent,
    ContactsComponent,
    AutoDetailsComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxUiLoaderModule.forRoot( ngxUILoader ),
    NgxUiLoaderRouterModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxScrollTopModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
