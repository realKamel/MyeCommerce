import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-navbar-auth",
  imports: [NgbCollapse, RouterLink, RouterLinkActive],
  templateUrl: "./navbar-auth.component.html",
  styleUrl: "./navbar-auth.component.css",
})
export class NavbarAuthComponent {
  isMenuCollapsed = true;
}
