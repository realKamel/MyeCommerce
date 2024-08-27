import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Subscription } from "rxjs";
import { IProduct } from "../../interfaces/iproduct";
import { NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [NgbRatingModule, RouterLink],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	private AllProdSubscribe!: Subscription;
	AllProdRes: IProduct[] | null = null;
	ngOnInit(): void {
		this.AllProdSubscribe = this._ProductsService
			.getAllProducts()
			.subscribe({
				next: (res) => {
					this.AllProdRes = res.data;
				},
				error: (err) => {
					console.log(err);
				},
			});
	}

	ngOnDestroy(): void {
		this.AllProdSubscribe.unsubscribe();
	}
}
