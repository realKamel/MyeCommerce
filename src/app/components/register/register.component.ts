import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnDestroy {
	private _AuthService: AuthService = inject(AuthService);

	private signUpSub!: Subscription;
	isLoading: WritableSignal<boolean> = signal(false);
	errMsg: WritableSignal<string> = signal("");

	registerForm: FormGroup = new FormGroup(
		{
			name: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
			]),
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.pattern(/^\w{6,}$/),
			]),
			rePassword: new FormControl(null),
			phone: new FormControl(null, [
				Validators.required,
				Validators.pattern(/^01[0125][0-9]{8}$/),
			]),
		},
		this.checkPasswords
	);
	checkPasswords(f: AbstractControl) {
		if (f.get("password")?.value === f.get("rePassword")?.value) {
			return null;
		}
		return { mismatch: "true" };
	}
	submitRegisterForm() {
		if (this.registerForm.valid) {
			this.isLoading.set(true);
			this.signUpSub = this._AuthService
				.signUp(this.registerForm.value)
				.subscribe({
					next: (value) => {
						console.log(value);
						this.isLoading.set(false);
					},
					error: (error: HttpErrorResponse) => {
						this.errMsg.set(error.error.message);
						this.isLoading.set(false);
					},
				});
		}
	}
	ngOnDestroy(): void {
		this.signUpSub?.unsubscribe();
	}
}
