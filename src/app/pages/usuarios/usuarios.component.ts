import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})

export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'opcoes'];
  usuariosDataSource: any = new MatTableDataSource();

  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private usuarioService: UsuarioService
  ) { }

  @ViewChild(MatSort) sort!: MatSort;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.obterUsuarios();
  }

  obterUsuarios(filtro = ''){
    this.usuarioService.obterUsuarios(filtro).subscribe((res: Usuario[]) => {
      this.usuariosDataSource = new MatTableDataSource(res);
      this.usuariosDataSource.sort = this.sort;
    })
  }

}
