import { Component, inject, OnInit } from "@angular/core";
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
} from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-navbar-blank",
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgbCollapseModule],
	templateUrl: "./navbar-blank.component.html",
	styleUrl: "./navbar-blank.component.scss",
})
export class NavbarBlankComponent implements OnInit {
	isMenuCollapsed = true;
	private _Router = inject(Router);
	private _AuthService = inject(AuthService);

	ngOnInit() {
		this._Router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isMenuCollapsed = true;
			}
		});
	}
	toggleCollapse() {
		this.isMenuCollapsed = !this.isMenuCollapsed;
	}
	logOut() {
		this._AuthService.deleteUserToken();
		this._Router.navigate(["/login"]);
	}
}
