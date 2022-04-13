export interface Comentario {
  id?: string | any;
  equipamentoId: string;
  nomeUsuario?: string;
  dataComentario: string | Date;
  descricao: string;
}
