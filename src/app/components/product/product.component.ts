import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../interfaces/iproduct";
import { Subscription } from "rxjs";
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SearchFilterPipe } from "../../pipes/search-filter.pipe";

@Component({
	selector: "app-product",
	standalone: true,
	imports: [NgbRating, RouterLink, FormsModule, SearchFilterPipe],
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnInit, OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	AllProdRes: IProduct[] | null = null;
	private AllProdSubscribe!: Subscription;

	searchTerm: string = "";

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
		this.AllProdSubscribe?.unsubscribe();
	}
}
