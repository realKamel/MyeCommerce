import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { Subscription } from "rxjs";

@Component({
	selector: "app-categorie",
	standalone: true,
	imports: [],
	templateUrl: "./categorie.component.html",
	styleUrl: "./categorie.component.scss",
})
export class CategorieComponent implements OnInit, OnDestroy {
	_CategoriesService = inject(CategoriesService);
	AllCategoriesRes!: ICategory[];
	AllCategoriesSub!: Subscription;
	ngOnInit(): void {
		this.AllCategoriesSub = this._CategoriesService
			.getAllCategories()
			.subscribe({
				next: (res) => {
					this.AllCategoriesRes = res.data;
				},
			});
	}
	ngOnDestroy(): void {
		this.AllCategoriesSub?.unsubscribe();
	}
}
