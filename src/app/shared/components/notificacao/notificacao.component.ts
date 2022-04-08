import { Component } from '@angular/core';
import { NotificacoesService } from '../../services/notificacoes.service';

export interface Notificacao {
  id: number,
  mensagem: string,
  novo: boolean,
  type?: string
}
@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent {
  notificacoes: Notificacao[] = [];

  constructor(private notificacoesService: NotificacoesService) {
     this.notificacoesService.getNotificacoes()
      .subscribe((novaNotificacao: Notificacao) => {


        switch(novaNotificacao.novo) {
          case true:
            if(this.notificacoes.length == 1){
              break;
            }
            this.notificacoes.push(novaNotificacao);
            break;

          case false:
            this.notificacoes = this.notificacoes.filter(notificacao => {
              return notificacao.id !== novaNotificacao.id;
            });
            break;
        }
      });
  }

  remover(notificacao: Notificacao) {
    this.notificacoesService.removerNotificacao(notificacao);
  }

  getType(notificacao: Notificacao) {
    return ['notificacao', `bg-${notificacao.type}`]
  }
}
