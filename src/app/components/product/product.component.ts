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
import { forkJoin, Subject, takeUntil } from "rxjs";
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SearchFilterPipe } from "../../pipes/search-filter.pipe";
import { CurrencyPipe, NgClass } from "@angular/common";
import { WishlistService } from "../../services/wishlist.service";
import { IWishlist } from "../../interfaces/iwishlist";
import { CartService } from "../../services/cart.service";
import { toast } from "ngx-sonner";

@Component({
  selector: "app-product",
  imports: [
    NgbRating,
    RouterLink,
    FormsModule,
    SearchFilterPipe,
    CurrencyPipe,
    NgClass,
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.css",
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly _ProductsService = inject(ProductsService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  productsList: WritableSignal<IProduct[]> = signal([]);
  searchTerm: WritableSignal<string> = signal("");

  ngOnInit() {
    forkJoin({
      wishlist: this._WishlistService.getLoggedUserWishlist(),
      products: this._ProductsService.getAllProducts(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ wishlist, products }) => {
          // Set the wishlist signal first
          this._WishlistService.inWishListProductsIds.set(
            wishlist.data.map((product: IWishlist) => product._id)
          );

          // Then process the products with the updated wishlist data
          const newList = products.data.map((product: IProduct) => {
            product.inWishList = this._WishlistService
              .inWishListProductsIds()
              .includes(product.id);
            return product;
          });

          // Set the products signal
          this.productsList.set(newList);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }
  addToWishlist(id: string) {
    this._WishlistService
      .addProductToWishlist(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          console.log(result);
          this._WishlistService.inWishListProductsIds = result.data;
          this.productsList.update((products) =>
            products.map((p) => (p._id === id ? { ...p, inWishList: true } : p))
          );
          toast.success(result.message);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  removeFromWishlist(id: string) {
    this._WishlistService
      .removeProductFromWishlist(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this._WishlistService.inWishListProductsIds = result.data;
          this.productsList.update((products) =>
            products.map((p) =>
              p._id === id ? { ...p, inWishList: false } : p
            )
          );
          toast.info(result.message);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  addToCart(id: string) {
    this._CartService
      .addProductToCart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this._CartService.numOfCartItems.set(res.numOfCartItems);
          toast.success(res.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
