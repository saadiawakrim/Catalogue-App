import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router : Router = inject(Router);
  const appStateService : AppStateService = inject(AppStateService);
  if(!appStateService.authState.roles.includes('ADMIN')){
    return false;
  }
  return true;
};
