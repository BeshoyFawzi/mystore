import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component'
import { HomeComponent } from './Components/home/home.component';
import { MyproductsComponent } from './Components/myproducts/myproducts.component';
import { ProductsComponent } from './Components/products/products.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { NotauthGuardService } from './guard/notauth-guard.service';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { CardComponent } from './Components/card/card.component';


const routes: Routes = [
  {path:"home",component: HomeComponent},
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  {path:'profile',component: ProfileComponent,canActivate:[AuthGuardService]},
  {path:'products', component: ProductsComponent,canActivate:[AuthGuardService]},
  {path:'myproducts', component:MyproductsComponent,canActivate:[AuthGuardService]},
  {path:'login', component: LoginComponent,canActivate:[NotauthGuardService]},
  {path:'register', component: RegisterComponent,canActivate:[NotauthGuardService]},
  {path:'product/:key', component: ProductDetailComponent,canActivate:[AuthGuardService]},
  {path:'CardComponent', component: CardComponent,canActivate:[AuthGuardService]},
  {path:'CardComponent/:key', component: CardComponent,canActivate:[AuthGuardService]},
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
