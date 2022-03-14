import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { SoftwaresService } from '../../services/softwares.service';

@Component({
  selector: 'app-modal-novo-software',
  templateUrl: './modal-novo-software.component.html'
})

export class ModalNovoSoftwareComponent implements OnInit {
  softwareForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalNovoSoftwareComponent>,
    private fb: FormBuilder,
    private softwaresService: SoftwaresService,
    private notificacoesService: NotificacoesService
  ) { }

  ngOnInit(): void {
    this.inicializador();
  }

  inicializador() {
    this.softwareForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descricao: [null, [Validators.maxLength(2000)]]
    })
  }

  salvarSoftware(){
    const software = {
      nome: this.softwareForm.controls['nome'].value,
      descricao: this.softwareForm.controls['descricao'].value
    }

    this.softwaresService.salvarSoftware(software).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Software salvo com sucesso!')
        this.dialogRef.close('Done!');
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel adicionar o software. Tente novamente mais tarde.');
        }
      }
    )
  }

  fecharModal(){
    this.dialogRef.close();
  }

}
