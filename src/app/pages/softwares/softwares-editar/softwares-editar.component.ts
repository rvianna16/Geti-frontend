import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Licenca } from '../../licencas/models/licencas';
import { Software } from '../models/software';
import { SoftwaresService } from '../services/softwares.service';

@Component({
  selector: 'app-softwares-editar',
  templateUrl: './softwares-editar.component.html'
})

export class SoftwaresEditarComponent implements OnInit {
  softwareId: string = '';
  software!: Software;
  softwareForm!: FormGroup;
  displayedColumns: string[] = ['nome', 'chave', 'visualizar'];
  licencasDataSource = new MatTableDataSource<Licenca>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private softwaresService: SoftwaresService,
    private notificacoesService: NotificacoesService
  ) { }

  ngOnInit(): void {
    this.softwareId = history.state.state?.id;

    if(this.softwareId){
      this.inicializador();
    }else {
      this.voltar();
    }
  }

  inicializador(){
    this.obterDetalhesSoftware();
  }

  inicializarFormulario(){
    this.softwareForm = this.fb.group({
      nome: [this.software.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descricao: [this.software.descricao, [ Validators.maxLength(200)]]
    })
  }

  obterDetalhesSoftware(){
    this.softwaresService.obterSoftwareLicencas(this.softwareId).subscribe((res: Software) => {
      this.software = res;
      this.licencasDataSource = new MatTableDataSource(this.software.licencas);
      this.inicializarFormulario();
    })
  }

  alterarSoftware(){
    const software: Software = {
      id: this.softwareId,
      nome: this.softwareForm.controls['nome'].value,
      descricao: this.softwareForm.controls['descricao'].value
    }
    this.softwaresService.alterarSoftware(this.softwareId, software).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Software alterado com sucesso!')
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel alterar o software. Tente novamente mais tarde.');
        }
      }
    )
  }

  excluirSoftware(){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o software ${this.software.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.softwaresService.excluirSoftware(this.softwareId).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Software excluído com sucesso!');
            this.voltar();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('Não foi possivel excluir o software. Tente novamente mais tarde.');
            }
          });
      }
   });
  }

  voltar(){
    this.router.navigate(['softwares']);
  }

}
