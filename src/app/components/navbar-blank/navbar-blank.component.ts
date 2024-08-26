import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-navbar-blank",
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgbCollapseModule],
	templateUrl: "./navbar-blank.component.html",
	styleUrl: "./navbar-blank.component.scss",
})
export class NavbarBlankComponent {
	isMenuCollapsed = true;
}
