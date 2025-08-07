import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { toast, NgxSonnerToaster } from "ngx-sonner";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NgxSpinnerModule, NgxSonnerToaster],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "MyeCommerce";
  protected readonly toast = toast;
}
