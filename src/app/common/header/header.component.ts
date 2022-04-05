import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAlterarSenhaComponent } from 'src/app/pages/usuarios/modais/modal-alterar-senha/modal-alterar-senha.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mobileQuery: MediaQueryList;
  nomeUsuario: string = '';

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const usuario = JSON.parse(`${localStorage.getItem('user')}`);
    this.nomeUsuario = usuario.nome;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  alterarSenha(){
    const usuario: any = JSON.parse(`${localStorage.getItem('user')}`);

    this.dialog.open(ModalAlterarSenhaComponent, {
      width: '680px',
      data: {
        nome: usuario.nome,
        id: usuario.id
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
