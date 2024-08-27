import { CanActivateFn } from '@angular/router';

export const logedInGuard: CanActivateFn = (route, state) => {
  return true;
};
