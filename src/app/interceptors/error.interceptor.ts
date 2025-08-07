import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { toast } from "ngx-sonner";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // const _ToastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // _ToastrService.error(err.error.message, "FreshCart");
      toast.error(err.error.message);
      return throwError(() => {
        err;
      });
    })
  );
};
