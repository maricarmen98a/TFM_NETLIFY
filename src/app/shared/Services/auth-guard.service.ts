import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor( private router: Router, public local: LocalStorageService, private auth: AuthStateService, public token: TokenService) { }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
        this.token.isLoggedIn();
        console.log(this.token.isLoggedIn())
        if (this.token.isLoggedIn()) {
            // check if route is restricted by role
            if (route.data['role'] && route.data['role'].indexOf(retrievedObject.role) === -1) {
                // role not authorised so redirect to home page
                console.log(retrievedObject.role)

                this.router.navigate(['/']);
                return false;
            }
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}