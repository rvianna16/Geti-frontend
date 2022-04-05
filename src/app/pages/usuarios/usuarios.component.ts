import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { ModalAlterarSenhaComponent } from './modais/modal-alterar-senha/modal-alterar-senha.component';
import { ModalNovoUsuarioComponent } from './modais/modal-novo-usuario/modal-novo-usuario.component';
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})

export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'opcoes'];
  usuariosDataSource = new MatTableDataSource<Usuario>();

  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private notificacoesService: NotificacoesService
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

  adicionarUsuario(){
    const dialogRef = this.dialog.open(ModalNovoUsuarioComponent, {
      width: '680px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.obterUsuarios();
      }
    })
  }

  excluirUsuario(usuario: Usuario){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o usuário ${usuario.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.usuarioService.excluirUsuario(usuario.id).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Usuário excluído com sucesso!');
            this.obterUsuarios();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('Não foi possivel excluir o usuário. Tente novamente mais tarde.');
            }
          });
      }
   });
  }

  alterarSenhaUsuario(usuario: Usuario){
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '680px',
      data: {
        nome: usuario.nome,
        id: usuario.id
      }
    })
  }

}
