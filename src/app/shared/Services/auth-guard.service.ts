import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    isSignedIn!: boolean;
    constructor( private router: Router, public local: LocalStorageService, private auth: AuthStateService, public token: TokenService) { }

    canActivate (route: ActivatedRouteSnapshot) {
        let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
        this.auth.userAuthState.subscribe((val) => {
            this.isSignedIn = val; 
        });
        if (this.isSignedIn) {
            // check if route is restricted by role
            if (route.data['role'] && route.data['role'].indexOf(retrievedObject.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}