import { Routes } from "@angular/router";

import { AuthComponent } from "./layouts/auth/auth.component";
import { BlankComponent } from "./layouts/blank/blank.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { CartComponent } from "./components/cart/cart.component";
import { BrandsComponent } from "./components/brands/brands.component";
import { CategorieComponent } from "./components/categorie/categorie.component";
import { ProductComponent } from "./components/product/product.component";
import { WishlistComponent } from "./components/wishlist/wishlist.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { authGuard } from "./guards/auth.guard";
import { logedInGuard } from "./guards/loged-in.guard";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { AllOrdersComponent } from "./components/all-orders/all-orders.component";

export const routes: Routes = [
	{
		path: "",
		component: BlankComponent,
		canActivate: [logedInGuard],
		children: [
			{ path: "", redirectTo: "home", pathMatch: "full" },
			{ path: "home", component: HomeComponent },
			{ path: "cart", component: CartComponent },
			{ path: "brands", component: BrandsComponent },
			{ path: "categories", component: CategorieComponent },
			{ path: "product", component: ProductComponent },
			{ path: "wishlist", component: WishlistComponent },
			{ path: "ProductDetails/:id", component: ProductDetailsComponent },
			{ path: "checkOut/:cart_id", component: CheckOutComponent },
			{ path: "allorders", component: AllOrdersComponent },
		],
	},
	{
		path: "",
		component: AuthComponent,
		canActivate: [authGuard],
		children: [
			{ path: "", redirectTo: "login", pathMatch: "full" },
			{ path: "login", component: LoginComponent },
			{ path: "register", component: RegisterComponent },
			{ path: "forget", component: ForgetPasswordComponent },
		],
	},
	{ path: "**", component: NotfoundComponent },
];
