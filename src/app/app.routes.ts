import { Routes } from "@angular/router";
import { AuthComponent } from "./layouts/auth/auth.component";
import { BlankComponent } from "./layouts/blank/blank.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProductComponent } from "./components/product/product.component";
import { authGuard } from "./guards/auth.guard";
import { logedInGuard } from "./guards/loged-in.guard";

export const routes: Routes = [
	{
		path: "",
		component: BlankComponent,
		canActivate: [logedInGuard],
		children: [
			{ path: "", redirectTo: "home", pathMatch: "full" },
			{ path: "Home", redirectTo: "home", pathMatch: "full" },
			{ path: "home", component: HomeComponent },
			{ path: "cart", component: CartComponent },
			{
				path: "brands",
				loadComponent: () =>
					import("./components/brands/brands.component").then(
						(c) => c.BrandsComponent
					),
			},
			{
				path: "categories",
				loadComponent: () =>
					import("./components/categorie/categorie.component").then(
						(c) => c.CategorieComponent
					),
			},
			{ path: "product", component: ProductComponent },
			{
				path: "wishlist",
				loadComponent: () =>
					import("./components/wishlist/wishlist.component").then(
						(c) => c.WishlistComponent
					),
			},
			{
				path: "ProductDetails/:id",
				loadComponent: () =>
					import(
						"./components/product-details/product-details.component"
					).then((c) => c.ProductDetailsComponent),
			},
			{
				path: "checkOut/:cart_id",
				loadComponent: () =>
					import("./components/check-out/check-out.component").then(
						(c) => c.CheckOutComponent
					),
			},
			{
				path: "allorders",
				loadComponent: () =>
					import("./components/all-orders/all-orders.component").then(
						(c) => c.AllOrdersComponent
					),
			},
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
			{
				path: "forget",
				loadComponent: () =>
					import(
						"./components/forget-password/forget-password.component"
					).then((c) => c.ForgetPasswordComponent),
			},
		],
	},
	{ path: "**", component: NotfoundComponent },
];
