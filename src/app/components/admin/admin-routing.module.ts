import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { OrderAdminComponent } from "./order/order.admin.component";
import { ProductAdminComponent } from "./product/product.admin.component";
import { OrderDetailAdminComponent } from "./order-detail/order-detail.admin.component";
import { UserAdminComponent } from "./user/user.admin.component";


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'products', component: ProductAdminComponent },
      { path: 'orders', component: OrderAdminComponent },
      { path: 'orders/:id', component: OrderDetailAdminComponent },
      { path: 'users', component: UserAdminComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
