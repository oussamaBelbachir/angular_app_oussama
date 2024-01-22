import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host:string = "http://localhost:8089/users";
  constructor(private appState : AppStateService, private http : HttpClient) { }


  async login(username : string, password : string){

    const data:any = await firstValueFrom(this.http.get(`${this.host}/${username}`));

    if(btoa(password) === data.password){
      const {token} = data;
      const decodedJwt : any = jwtDecode(token);
      console.log("decodedJwt ",decodedJwt);

      this.appState.setAuthState({
        isAuthenticated : true,
        username : decodedJwt.sub,
        roles : decodedJwt.roles,
        token
      });

      return Promise.resolve(true);

    }else{
      console.log("💥 💥 💥 💥 💥 💥 💥 💥 ");
      return Promise.reject("Bad Credentials");
    }



  }
}
