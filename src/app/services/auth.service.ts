import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private _HttpClient = inject(HttpClient);

	signUp(userDate: object): Observable<any> {
		return this._HttpClient.post(
			`${environment.BaseUrl}/api/v1/auth/signup`,
			userDate
		);
	}

	signIn(userDate: object): Observable<any> {
		return this._HttpClient.post(
			`${environment.BaseUrl}/api/v1/auth/signin`,
			userDate
		);
	}
	forgetPassword(email: string): Observable<any> {
		return this._HttpClient.post(
			`${environment.BaseUrl}/api/v1/auth/forgotPasswords`,
			{
				email: `${email}`,
			}
		);
	}
	verifyResetCode(code: string): Observable<any> {
		return this._HttpClient.post(
			`${environment.BaseUrl}/api/v1/users/changeMyPassword`,
			{
				resetCode: `${code}`,
			}
		);
	}

	resetPassword(email: string, password: string): Observable<any> {
		return this._HttpClient.put(
			`${environment.BaseUrl}/api/v1/auth/resetPassword`,
			{
				email: `${email}`,
				newPassword: `${password}`,
			}
		);
	}
}
