import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	constructor(private _HttpClient: HttpClient) {}
	getAllProducts(): Observable<any> {
		return this._HttpClient.get(`${environment.BaseUrl}/api/v1/products`);
	}
	getSpcificProduct(id: string | number): Observable<any> {
		return this._HttpClient.get(
			`${environment.BaseUrl}/api/v1/products/${id}`
		);
	}
}
