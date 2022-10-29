import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectToken } from '../store/selectors/system.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  token: string;

    constructor(private store: Store<AppState>) {
      this.store.select(selectToken).subscribe(token => {
        this.token = token;
      });
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authToken = this.token;
        if (authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: authToken
                }
            });
        }

        return next.handle(request);
    }
}
