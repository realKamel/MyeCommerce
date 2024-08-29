import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const logedInGuard: CanActivateFn = (route, state) => {
	const _AuthService = inject(AuthService);
	if (_AuthService.getUserToken()) {
		return true;
	} else {
		return false;
	}
};
