import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, timer } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { Notificacao } from '../components/notificacao/notificacao.component';

@Injectable({
  providedIn: 'root'
})

export class NotificacoesService {
  id: number = 0;
  private notificacoes = new Subject<Notificacao>()

  constructor(private dialog: MatDialog) { }

  getNotificacoes(): Observable<Notificacao>{
    return this.notificacoes.asObservable();
  }

  private notificar(mensagem: string, type: string, novo = true, ){
    const notificacao = {
      id: this.id++,
      mensagem,
      type,
      novo
    }

    this.notificacoes.next(notificacao);

    timer(3000).subscribe(() => {
      this.removerNotificacao(notificacao);
    });
  }

  notificarSucesso(mensagem: string) {
    this.notificar(mensagem, 'success');
  }

  notificarErro(mensagem: string) {
    this.notificar(mensagem, 'danger');
  }

  notificarAlerta(mensagem: string) {
    this.notificar(mensagem, 'alert');
  }

  removerNotificacao(notificacao: Notificacao) {
    notificacao.novo = false;
    this.notificacoes.next(notificacao);
  }

  addConfirmacao(mensagem: string): Observable<boolean>{
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: mensagem
    })

    return dialogRef.afterClosed() as Observable<boolean>;
  }
}
