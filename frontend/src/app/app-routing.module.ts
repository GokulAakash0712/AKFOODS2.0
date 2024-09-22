import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/pages/user/user.component';
import { HomeComponent } from './components/pages/user/home/home.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './auth/guard/admin.guard';
import { AllusersComponent } from './components/pages/admin/allusers/allusers.component';
import { AdminHomeComponent } from './components/pages/admin/admin-home/admin-home.component';
import { AllOrdersComponent } from './components/pages/admin/all-orders/all-orders.component';
import { AllFoodsComponent } from './components/pages/admin/all-foods/all-foods.component';
import { CreateFoodsComponent } from './components/pages/admin/create-foods/create-foods.component';
import { FoodPageComponent } from './components/pages/user/food-page/food-page.component';
import { CartPageComponent } from './components/pages/user/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/user/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { PaymentPageComponent } from './components/pages/user/payment-page/payment-page.component';
import { AllOrdersPageComponent } from './components/pages/user/all-orders-page/all-orders-page.component';
import { OrderTrackPageComponent } from './components/pages/user/order-track-page/order-track-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search/:searchTerm', component: HomeComponent },
      { path: 'tag/:tag', component: HomeComponent },
      { path: 'food/:id', component: FoodPageComponent },
      { path: 'cart-page', component: CartPageComponent },
      {
        path: 'checkout-page',
        component: CheckoutPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'payment',
        component: PaymentPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all-orders',
        component: AllOrdersPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'track/:orderId',
        component: OrderTrackPageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'allusers',
        component: AllusersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'allorders',
        component: AllOrdersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'allfoods',
        component: AllFoodsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'createfoods',
        component: CreateFoodsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'editfood/:id',
        component: CreateFoodsComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
