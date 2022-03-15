import { Licenca } from "../../licencas/models/licencas";

export interface Software {
  id?:  string | any,
  nome: string,
  descricao: string,
  licencas?: Licenca[]
}
