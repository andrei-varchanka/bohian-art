import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from "../api/models/user";

@Injectable()
export class ContextService {

  private currentUser: User;

  private authToken: string;

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  getCurrentUser(): User {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    }
    return this.currentUser;
  }

  setCurrentUser(value: User): void {
    this.currentUser = value;
    localStorage.setItem('current_user', JSON.stringify(value));
  }

  getAuthToken(): string {
    if (!this.authToken) {
      this.authToken = this.cookieService.get('auth_token');
    }
    return this.authToken;
  }

  setAuthToken(value: string): void {
    this.authToken = value;
    this.cookieService.set('auth_token', value);
  }

  deleteAuthToken(): void {
    this.authToken = null;
    this.cookieService.delete('auth_token', '/');
  }

  public logout() {
    this.setCurrentUser(null);
    this.deleteAuthToken();
    this.router.navigate(['/']);
  }
}
