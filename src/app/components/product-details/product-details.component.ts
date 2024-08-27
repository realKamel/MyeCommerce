import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../interfaces/iproduct";
import { Subscription } from "rxjs";

@Component({
	selector: "app-product-details",
	standalone: true,
	imports: [],
	templateUrl: "./product-details.component.html",
	styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
	private readonly _ActivatedRoute = inject(ActivatedRoute);
	private readonly _ProductsService = inject(ProductsService);
	productId!: string | null;
	SpcificProdRes: IProduct | null = null;
	SpcificProdSubscribe!: Subscription;

	ngOnInit(): void {
		this._ActivatedRoute.paramMap.subscribe({
			next: (p) => {
				this.productId = p.get("id");
				this.SpcificProdSubscribe = this._ProductsService
					.getSpcificProduct(this.productId)
					.subscribe({
						next: (res) => {
							this.SpcificProdRes = res.data;
							console.log("this is the res: ", res.data);
						},
					});
			},
		});
	}

	ngOnDestroy(): void {
		this.SpcificProdSubscribe?.unsubscribe();
	}
}
