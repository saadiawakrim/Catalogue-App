import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router : Router = inject(Router);
  const appStateService : AppStateService = inject(AppStateService);
  if(!appStateService.authState.authenticated){
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
