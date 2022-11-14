import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { selectToken } from '../../../store/selectors/system.selectors';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  token: string;

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select(selectToken).subscribe(token => {
      this.token = token;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.token) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
