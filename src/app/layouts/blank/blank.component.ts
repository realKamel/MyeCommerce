import { Component } from "@angular/core";
import { NavbarBlankComponent } from "../../components/navbar-blank/navbar-blank.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-blank",
  imports: [NavbarBlankComponent, RouterOutlet],
  templateUrl: "./blank.component.html",
  styleUrl: "./blank.component.css",
})
export class BlankComponent {}
