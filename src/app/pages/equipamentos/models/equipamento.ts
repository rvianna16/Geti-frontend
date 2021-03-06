import { Licenca } from "../../licencas/models/licencas";

export interface Equipamento {
  id: string;
  colaboradorId: string;
  patrimonio: string;
  tipoEquipamento: string;
  descricao: string;
  dataAquisicao: string;
  nomeColaborador: string;
  notaFiscal: string;
  modelo: string;
  armazenamento: string;
  memoria: string;
  processador: string;
  ip: string;
  statusEquipamento: string;
  licencas?: Licenca[];
  comentarios?: any;
}
