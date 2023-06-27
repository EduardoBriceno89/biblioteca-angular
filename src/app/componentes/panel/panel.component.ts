import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.files();
  }

  files() {
    this.apiService.getFiles().subscribe((res) => {
      console.log(res);
    });
  }

  makeLogout() {
    this.apiService.logout();
  }
}
