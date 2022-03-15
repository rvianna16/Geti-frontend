import { Equipamento } from "../../equipamentos/models/equipamento";

export interface Colaborador {
  id?: string | any;
  nome: string;
  email: string;
  equipamentos?: Equipamento[];
}
