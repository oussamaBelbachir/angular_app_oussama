import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {delay, finalize, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{

  constructor(private appState : AppStateService,private ls : LoadingService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // this.appState.setProductState({status : "LOADING"});
    this.ls.showLoadingSpinner();
    let req = request.clone({
      headers : request.headers.set("Authorization" , "Bearer JWT")
    });
    return next.handle(req).pipe(delay(400)).pipe(finalize(() => {
      // this.appState.setProductState({status : ""})
      this.ls.hideLoadingSpinner();
    }));
  }

}
