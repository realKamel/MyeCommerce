import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { ProductComponent } from "../product/product.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [RouterLink, CarouselModule, ProductComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
	private readonly _CategoriesService = inject(CategoriesService);
	AllCategoriesRes: WritableSignal<ICategory[]> = signal([]);
	private AllCategoriesSub!: Subscription;
	searchTerm: WritableSignal<string> = signal("");
	catCustomOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: true,
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
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ["", ""],
		responsive: {
			0: {
				items: 1,
			},
			400: {
				items: 1,
			},
			740: {
				items: 2,
			},
			940: {
				items: 4,
			},
		},
		nav: true,
	};
	ngOnInit(): void {
		this.AllCategoriesSub = this._CategoriesService
			.getAllCategories()
			.subscribe({
				next: (res) => {
					this.AllCategoriesRes.set(res.data);
				},
				error: (err) => {
					console.log(err);
				},
			});
	}
	ngOnDestroy(): void {
		this.AllCategoriesSub?.unsubscribe();
	}
}
