import { IWishlistRes } from "./../../interfaces/iwishlist";
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { WishlistService } from "../../services/wishlist.service";
import { finalize, Subject, takeUntil } from "rxjs";
import { IWishlist } from "../../interfaces/iwishlist";
import { CurrencyPipe } from "@angular/common";
import { CartService } from "../../services/cart.service";
import { ToastrService } from "ngx-toastr";
import { toast } from "ngx-sonner";

@Component({
  selector: "app-wishlist",
  imports: [CurrencyPipe],
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.css",
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  getLoggedUserWishlistRes: WritableSignal<IWishlist[]> = signal([]);
  protected readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getAllWishList();
  }

  getAllWishList() {
    this._WishlistService
      .getLoggedUserWishlist()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: IWishlistRes) => {
          this.getLoggedUserWishlistRes.set(res.data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  removeFromWishlist(id: string) {
    this._WishlistService
      .removeProductFromWishlist(id)
      .pipe(
        finalize(() => {
          this.getAllWishList();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          toast.success(result.message);
          this._WishlistService.inWishListProductsIds.set(result.data);
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
        next: (result) => {
          this._CartService.numOfCartItems.set(result.numOfCartItems);
          toast.success(result.message);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
