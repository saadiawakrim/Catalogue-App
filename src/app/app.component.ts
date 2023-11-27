import { Component } from '@angular/core';
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public appStateService : AppStateService) {
  }

  title = 'catalog_app_v2';
}
