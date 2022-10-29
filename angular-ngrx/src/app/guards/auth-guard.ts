import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/api/models';
import { selectCurrentUser, selectToken } from 'src/app/store/selectors/system.selectors';
import { AppState } from 'src/app/store/state/app.state';
import {ContextService} from "../services/context-service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  token: string;

  constructor(private router: Router, private context: ContextService, private store: Store<AppState>) {
    this.store.select(selectToken).subscribe(token => {
      this.token = token;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.token) {
      return true;
    }
    this.context.logout();
    return false;
  }
}
