import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../interfaces/iproduct";
import { Subscription } from "rxjs";
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SearchFilterPipe } from "../../pipes/search-filter.pipe";
import { CurrencyPipe, NgClass } from "@angular/common";
import { WishlistService } from "../../services/wishlist.service";
import { IWishlist } from "../../interfaces/iwishlist";

@Component({
	selector: "app-product",
	standalone: true,
	imports: [
		NgbRating,
		RouterLink,
		FormsModule,
		SearchFilterPipe,
		CurrencyPipe,
		NgClass,
	],
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnInit, OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	private readonly _WishlistService = inject(WishlistService);
	allProdRes: WritableSignal<IProduct[]> = signal([]);
	private inWishListProudctsIds: string[] = [];
	searchTerm: WritableSignal<string> = signal("");
	private getLoggedUserWishlistSub!: Subscription;
	private allProdSubscribe!: Subscription;
	private removeProductFromWishlistSub!: Subscription;
	private addProductToWishlistSub!: Subscription;

	ngOnInit() {
		this.getLoggedUserWishlistSub = this._WishlistService
			.getLoggedUserWishlist()
			.subscribe({
				next: (res) => {
					this.inWishListProudctsIds = res.data.map(
						(prod: IWishlist) => prod._id
					);
					this.allProdSubscribe = this._ProductsService
						.getAllProducts()
						.subscribe({
							next: (res) => {
								this.allProdRes.set(
									res.data.map((product: IProduct) => {
										product.inWishList =
											this.inWishListProudctsIds.includes(
												product.id
											);
										return product;
									})
								);
								console.info(this.allProdRes());
							},
							error: (err) => {
								console.error(err);
							},
						});
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	onInput(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		this.searchTerm.set(inputElement.value);
	}
	addOrRemoveFromCart(id: string, inWishList: boolean = false) {
		if (inWishList) {
			this.removeProductFromWishlistSub = this._WishlistService
				.removeProductFromWishlist(id)
				.subscribe({
					next: (res) => {
						console.log(res);
						this.inWishListProudctsIds = res.data;
						console.log(this.inWishListProudctsIds);
					},
					error: (err) => {
						console.error(err);
					},
				});
		} else {
			this.addProductToWishlistSub = this._WishlistService
				.addProductToWishlist(id)
				.subscribe({
					next: (res) => {
						console.log(res);
						this.inWishListProudctsIds = res.data;
						console.log(this.inWishListProudctsIds);
					},
					error: (err) => {
						console.error(err);
					},
				});
		}
	}
	ngOnDestroy(): void {
		this.removeProductFromWishlistSub?.unsubscribe();
		this.addProductToWishlistSub?.unsubscribe();
		this.getLoggedUserWishlistSub?.unsubscribe();
		this.allProdSubscribe?.unsubscribe();
	}
}
