import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit, OnDestroy {
	private _AuthService = inject(AuthService);

	registerForm: FormGroup = new FormGroup({
		name: new FormControl(null),
		email: new FormControl(null),
		password: new FormControl(null),
		rePassword: new FormControl(null),
		phone: new FormControl(null),
	});
	ngOnInit(): void {}
	test() {
		console.log("good", this.registerForm.value);
	}
	ngOnDestroy(): void {}
}
