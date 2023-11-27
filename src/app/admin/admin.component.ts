import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(public appStateService : AppStateService) {
  }
  ngOnInit() {
  }
}
