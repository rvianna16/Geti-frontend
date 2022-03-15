import { Equipamento } from "../../equipamentos/models/equipamento";

export interface Licenca {
  id?: string | any;
  nome: string;
  chave: string;
  softwareId?: string | any;
  software: string;
  quantidade: number;
  disponivel: number;
  dataExpiracao: string;
  ativo: boolean;
  equipamentos: Equipamento[]
}
