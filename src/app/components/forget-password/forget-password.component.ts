import {
	Component,
	inject,
	OnDestroy,
	signal,
	WritableSignal,
} from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { NgClass } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
	selector: "app-forget-password",
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: "./forget-password.component.html",
	styleUrl: "./forget-password.component.scss",
})
export class ForgetPasswordComponent implements OnDestroy {
	private readonly _AuthService = inject(AuthService);
	private readonly _Router = inject(Router);
	private forgetPasswordSub!: Subscription;
	private verifyResetCodeSub!: Subscription;
	private resetPasswordSuB!: Subscription;
	isLoading: WritableSignal<boolean> = signal(false);
	OkMsgForUser: WritableSignal<string> = signal("");
	errorMsgForUser: WritableSignal<string> = signal("");
	userEmail: WritableSignal<string> = signal("");
	step: WritableSignal<number> = signal(0);

	checkEmailForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
	});
	checkCodeForm: FormGroup = new FormGroup({
		resetCode: new FormControl(null, [
			Validators.required,
			Validators.pattern(/^\d{6}$/),
		]),
	});

	checkNewPasswordForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		newPassword: new FormControl(null, [
			Validators.required,
			Validators.pattern(/^\w{6,}$/),
		]),
	});

	clearAlerts() {
		this.OkMsgForUser.set("");
		this.errorMsgForUser.set("");
	}
	checkEmail() {
		if (this.checkEmailForm.valid) {
			this.isLoading.set(true);
			this.forgetPasswordSub = this._AuthService
				.forgetPassword(this.checkEmailForm.value)
				.subscribe({
					next: (res: any) => {
						this.userEmail.set(
							this.checkEmailForm.get("email")?.value
						);
						console.log(res);
						this.isLoading.set(false);
						this.OkMsgForUser.set(res.message);
						if (res.statusMsg === "success") {
							this.step.update((s: number): number => s + 1);
							this.clearAlerts();
						}
					},
					error: (err: HttpErrorResponse) => {
						this.isLoading.set(false);
						this.clearAlerts();
						this.errorMsgForUser.set(err.error.message);
						console.log(err);
					},
				});
		}
	}
	checkCode() {
		if (this.checkCodeForm.valid) {
			this.clearAlerts();
			this.isLoading.set(true);
			this.verifyResetCodeSub = this._AuthService
				.verifyResetCode(this.checkCodeForm.value)
				.subscribe({
					next: (res) => {
						this.isLoading.set(false);
						if (res.status === "Success") {
							this.step.update((s: number): number => s + 1);
							this.checkNewPasswordForm
								.get("email")
								?.setValue(this.userEmail());
							this.clearAlerts();
						}
					},
					error: (err: HttpErrorResponse) => {
						this.isLoading.set(false);
						this.clearAlerts();
						this.errorMsgForUser.set(err.error.message);
						console.log(err);
					},
				});
		}
	}
	checkNewPassword() {
		if (this.checkNewPasswordForm.valid) {
			this.clearAlerts();
			this.isLoading.set(true);
			this.resetPasswordSuB = this._AuthService
				.resetPassword(this.checkNewPasswordForm.value)
				.subscribe({
					next: (res) => {
						this.isLoading.set(false);
						this._AuthService.setUserToken(res.token);
						this._Router.navigate(["/home"]);
					},
					error: (err: any) => {
						this.isLoading.set(false);
						this.errorMsgForUser.set(err.message);
						console.log(err);
					},
				});
		}
	}
	ngOnDestroy(): void {
		this.forgetPasswordSub?.unsubscribe();
		this.verifyResetCodeSub?.unsubscribe();
		this.resetPasswordSuB?.unsubscribe();
	}
}
