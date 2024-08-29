import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../interfaces/iuser";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private _HttpClient = inject(HttpClient);
	userData!: IUser;
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

	setUserToken(s: string) {
		localStorage.setItem("userToken", s);
		this.userData = jwtDecode(s);
	}
	getUserToken() {
		if (localStorage.getItem("userToken") !== null)
			return localStorage.getItem("userToken");
		else return null;
	}
	deleteUserToken() {
		localStorage.removeItem("userToken");
	}
}
