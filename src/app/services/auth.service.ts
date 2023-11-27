import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient, private appStateService : AppStateService) { }

  public login(username : string, password : string) : Observable<any>{
    let body = {
      "username" : username,
      "password" : password
    }
    return this.httpClient.post<any>("http://localhost:8080/api/v1/auth/login", body);
  }

  public authenticate(accessToken : string, refreshToken : string){
    console.log(accessToken);
    let decodedJwt : any = jwtDecode(accessToken);
    this.appStateService.setAuthState(
      {
        authenticated : true,
        username : decodedJwt.sub,
        roles : decodedJwt.roles,
        access_token : accessToken,
        refresh_token : refreshToken
      }
    );
  }
}
