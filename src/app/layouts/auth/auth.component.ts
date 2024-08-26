import { Component } from '@angular/core';
import { NavbarAuthComponent } from "../../components/navbar-auth/navbar-auth.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NavbarAuthComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
