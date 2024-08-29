import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
	const _AuthService = inject(AuthService);
	if (_AuthService.getUserToken()) {
		return false;
	} else {
		return true;
	}
};
