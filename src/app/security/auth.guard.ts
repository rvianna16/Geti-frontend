import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private authService: AuthService ) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      if(await this.authService.tokenIsValid() && this.authService.user){
        return true;
      }

      this.authService.removeToken();
      this.router.navigate(['login']);
      return false;
  }
}
