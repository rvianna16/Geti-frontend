import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { Notificacao, NotificacaoAcao } from '../components/notificacao/notificacao.component';

@Injectable({
  providedIn: 'root'
})

export class NotificacoesService {
  private notificacoes = new Subject<NotificacaoAcao>()

  constructor() { }

  getNotificacoes(): Observable<NotificacaoAcao>{
    return this.notificacoes.asObservable();
  }

  private notificar(notificacao: Notificacao){
    this.notificacoes.next({
      acao: 'novo',
      notificacao
    });

    timer(3000).subscribe(() => {
      this.removerNotificacao(notificacao);
    });
  }

  notificarSucesso(mensagem: string) {
    const objNotificacao = {
      mensagem,
      type: 'success'
    }

    this.notificar(objNotificacao);
  }

  notificarErro(mensagem: string) {
    const objNotificacao = {
      mensagem,
      type: 'danger'
    }

    this.notificar(objNotificacao);
  }

  notificarAlerta(mensagem: string) {
    const objNotificacao = {
      mensagem,
      type: 'alert'
    }

    this.notificar(objNotificacao);
  }

  removerNotificacao(notificacao: Notificacao) {
    this.notificacoes.next({
      acao: 'remover',
      notificacao
    });
  }
}
