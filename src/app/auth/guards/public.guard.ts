import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from '../services/auth-service.service';
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly route: Router,
    ) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.check();
    }
    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
        return this.check();
    }

    check(): MaybeAsync<GuardResult> {
        return this.authService.checkAuthenticator()
            .pipe(
                tap(re => {
                    if (re) {
                        this.route.navigate(['/'])
                    }
                }),
                map(map => !map)
            )
    }

}