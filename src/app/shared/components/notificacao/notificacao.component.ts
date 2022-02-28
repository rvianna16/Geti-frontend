import { Component } from '@angular/core';
import { NotificacoesService } from '../../services/notificacoes.service';

export type NotificacaoAcao = {
  acao: 'novo'|'remover',
  notificacao: Notificacao,
};

export type Notificacao = {
    mensagem: string,
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
      .subscribe((notificacaoAcao: NotificacaoAcao) => {

        switch(notificacaoAcao.acao) {
          case 'novo':
            this.notificacoes.push(notificacaoAcao.notificacao);
            break;

          case 'remover':
            this.notificacoes = this.notificacoes.filter(notificacao => {
              return notificacao !== notificacaoAcao.notificacao;
            });
            break;

          default:
            this.notificacoes = [];
            break;
        }
      });
  }

  remover(notificacao: Notificacao) {
    this.notificacoesService
      .removerNotificacao(notificacao);
  }

  getType(notificacao: Notificacao) {
    return ['notificacao', `bg-${notificacao.type}`]
  }
}
