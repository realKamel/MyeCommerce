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
import { Subscription } from "rxjs";
import { IWishlist } from "../../interfaces/iwishlist";
import { CurrencyPipe } from "@angular/common";

@Component({
	selector: "app-wishlist",
	standalone: true,
	imports: [CurrencyPipe],
	templateUrl: "./wishlist.component.html",
	styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent implements OnInit, OnDestroy {
	private readonly _WishlistService = inject(WishlistService);
	getLoggedUserWishlistRes: WritableSignal<IWishlist[]> = signal([]);
	cartCount: WritableSignal<number> = signal(0);
	private getLoggedUserWishlistSub!: Subscription;
	ngOnInit(): void {
		this._WishlistService.getLoggedUserWishlist().subscribe({
			next: (res: IWishlistRes) => {
				this.cartCount.set(res.count);
				this.getLoggedUserWishlistRes.set(res.data);
				console.log(this.getLoggedUserWishlistRes());
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
	ngOnDestroy(): void {
		this.getLoggedUserWishlistSub?.unsubscribe();
	}
}
