import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { TokenService } from "./token.service";
import { catchError, of } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService,public router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken
            }
        });
        return next.handle(req).pipe(
            catchError(
              (err, caught) => {
                if (err.status === 401){
                  this.handleAuthError();
                  return of(err);
                }
                throw err;
              }
            )
          );
        }
        private handleAuthError() {
          this.tokenService.removeToken();
          this.router.navigateByUrl('login');
          alert('Tiene que iniciar sesión.')
        }
    
}