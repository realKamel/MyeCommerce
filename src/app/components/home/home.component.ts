import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Subscription } from "rxjs";
import { IProduct } from "../../interfaces/iproduct";
import { NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { SearchFilterPipe } from "../../pipes/search-filter.pipe";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		NgbRatingModule,
		RouterLink,
		CarouselModule,
		FormsModule,
		SearchFilterPipe,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	private readonly _CategoriesService = inject(CategoriesService);
	AllProdRes: IProduct[] | null = null;
	AllCategoriesRes: ICategory[] | null = null;
	private AllProdSubscribe!: Subscription;
	private AllCategoriesSub!: Subscription;
	searchTerm: string = "";
	catCustomOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ["", ""],
		responsive: {
			0: {
				items: 1,
			},
			400: {
				items: 2,
			},
			740: {
				items: 4,
			},
			940: {
				items: 6,
			},
		},
		nav: true,
	};
	staticCustomOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ["", ""],
		responsive: {
			0: {
				items: 1,
			},
			400: {
				items: 2,
			},
			740: {
				items: 3,
			},
			940: {
				items: 4,
			},
		},
		nav: true,
	};
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
		this.AllCategoriesSub = this._CategoriesService
			.getAllCategories()
			.subscribe({
				next: (res) => {
					this.AllCategoriesRes = res.data;
				},
				error: (err) => {
					console.log(err);
				},
			});
	}

	ngOnDestroy(): void {
		this.AllProdSubscribe?.unsubscribe();
		this.AllCategoriesSub?.unsubscribe();
	}
}
