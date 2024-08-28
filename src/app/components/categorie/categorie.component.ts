import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { Subscription } from "rxjs";
import { ISubcategory } from "../../interfaces/isubcategory";

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
	getAllSubCategoriesOnCategoryRes!: ISubcategory[];
	private AllCategoriesSub!: Subscription;
	private getAllSubCategoriesOnCategorySub!: Subscription;
	ngOnInit(): void {
		this.AllCategoriesSub = this._CategoriesService
			.getAllCategories()
			.subscribe({
				next: (res) => {
					this.AllCategoriesRes = res.data;
				},
			});
	}

	getAllSubCategoriesOnCategory(id: string) {
		this.getAllSubCategoriesOnCategorySub = this._CategoriesService
			.getAllSubCategoriesOnCategory(id)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.getAllSubCategoriesOnCategoryRes = res.data;
				},
				error: (err) => {
					console.log(err);
				},
			});
	}
	ngOnDestroy(): void {
		this.AllCategoriesSub?.unsubscribe();
		this.getAllSubCategoriesOnCategorySub?.unsubscribe();
	}
}
