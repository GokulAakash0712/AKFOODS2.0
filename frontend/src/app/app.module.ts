import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AdminComponent } from './components/pages/admin/admin.component';
import { UserComponent } from './components/pages/user/user.component';
import { AdminHomeComponent } from './components/pages/admin/admin-home/admin-home.component';
import { AllFoodsComponent } from './components/pages/admin/all-foods/all-foods.component';
import { AllOrdersComponent } from './components/pages/admin/all-orders/all-orders.component';
import { AllusersComponent } from './components/pages/admin/allusers/allusers.component';
import { CreateFoodsComponent } from './components/pages/admin/create-foods/create-foods.component';
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';
import { CartPageComponent } from './components/pages/user/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/user/checkout-page/checkout-page.component';
import { FoodPageComponent } from './components/pages/user/food-page/food-page.component';
import { HomeComponent } from './components/pages/user/home/home.component';
import { PaymentPageComponent } from './components/pages/user/payment-page/payment-page.component';
import { AboutComponent } from './components/partials/about/about.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { PopularFoodsComponent } from './components/partials/popular-foods/popular-foods.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { MapComponent } from './components/partials/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/pages/user/order-track-page/order-track-page.component';
import { AllOrdersPageComponent } from './components/pages/user/all-orders-page/all-orders-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AdminHomeComponent,
    AllFoodsComponent,
    AllOrdersComponent,
    AllusersComponent,
    CreateFoodsComponent,
    DashboardComponent,
    CartPageComponent,
    CheckoutPageComponent,
    FoodPageComponent,
    HomeComponent,
    PaymentPageComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    NavbarComponent,
    OrderItemsListComponent,
    PopularFoodsComponent,
    StarRatingComponent,
    TagsComponent,
    NotFoundComponent,
    MapComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    AllOrdersPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      newestOnTop: false,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-top-right',
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
