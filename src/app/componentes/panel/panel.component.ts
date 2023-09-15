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
import jwt_decode from 'jwt-decode';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filesArray: any = [];
  searchQuery: string = '';
  filteredFiles: any = [];
  selectedFile: any;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.files();
    this.filteredFiles = this.filesArray.slice(0, 3); // Mostrar los primeros 3 documentos al inicio
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.getFilesPerPage();
    });
  }

  makeLogout() {
    this.apiService.Logout();
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

  filterFiles() {
    if (this.searchQuery === '') {
      this.selectedFile = null; // Restablecer selectedFile
      this.filteredFiles = this.filesArray.slice(0, 3); // Mostrar los primeros 3 documentos si la búsqueda está vacía
    } else {
      this.filteredFiles = this.filesArray.filter((file: any) =>
        file.tittle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onFileSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedTitle = event.option.viewValue;
    this.selectedFile = this.filesArray.find(
      (file: any) => file.tittle === selectedTitle
    );
  }
}
