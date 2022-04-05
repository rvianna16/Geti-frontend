export interface Usuario {
  id?: string | any;
  nome?: string;
  email: string;
  senha: string;
  confirmacaoSenha?: string;
}

export interface UsuarioNovaSenha {
  senha: string;
  confirmacaoSenha: string;
}
