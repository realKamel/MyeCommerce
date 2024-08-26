import { Component } from '@angular/core';
import { NavbarBlankComponent } from "../../components/navbar-blank/navbar-blank.component";

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [NavbarBlankComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
