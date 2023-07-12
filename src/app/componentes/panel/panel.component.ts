import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/servicios/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filesArray: any = [];

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.files();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.getFilesPerPage();
    });
  }

  makeLogout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  getRole(): boolean {
    const token = this.cookieService.get('token') as string;
    const tokenDecoded = jwt_decode(token) as { role: string };
    const userRole = tokenDecoded.role;

    return userRole == 'admin';
  }

  getFilesPerPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const filesPerPage = this.filesArray.slice(startIndex, endIndex);
  }

  files() {
    this.apiService.getFiles().subscribe((res) => {
      this.filesArray = res.files;
    });
  }

  downloadFile(url: string, filename: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        downloadLink.click();
      });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
