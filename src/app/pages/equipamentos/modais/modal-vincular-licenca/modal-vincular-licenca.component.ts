import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';

import { Licenca } from 'src/app/pages/licencas/models/licencas';
import { LicencasService } from 'src/app/pages/licencas/services/licencas.service';
import { Software } from 'src/app/pages/softwares/models/software';
import { SoftwaresService } from 'src/app/pages/softwares/services/softwares.service';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';

@Component({
  selector: 'app-modal-vincular-licenca',
  templateUrl: './modal-vincular-licenca.component.html'
})

export class ModalVincularLicencaComponent implements OnInit {
  vincularLicencaForm!: FormGroup;

  softwares: Software[] = [];
  softwaresFiltrados!: Observable<Software[]>;

  licencas: Licenca[] = [];
  licencasFiltrados!: Observable<Licenca[]>;

  constructor(
    private softwaresService: SoftwaresService,
    private licencasService: LicencasService,
    private fb: FormBuilder,
    private notificacoesService: NotificacoesService,
    public dialogRef: MatDialogRef<ModalVincularLicencaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obterSoftwares();
  }

  inicializarFormulario(){
    this.vincularLicencaForm = this.fb.group({
      softwareId: [null, Validators.required],
      licencaId: [null, Validators.required]
    })

    this.vincularLicencaForm.controls['licencaId'].disable();
  }

  obterSoftwares(){
    this.softwaresService.obterSoftwares().subscribe((res: Software[]) => {
      this.softwares = res;
      this.setupAutoCompleteSoftwares();
    });
  }

  obterLicencas(){
    const softwareId = this.vincularLicencaForm.controls['softwareId'].value.id;
    this.softwaresService.obterSoftwareLicencas(softwareId).subscribe((res: any) => {
      this.licencas = res.licencas;

      if(this.licencas.length == 0){
        this.notificacoesService.notificarErro("Este software não possui nenhuma licença vinculada.");
        this.vincularLicencaForm.controls['licencaId'].disable();
      }

      this.setupAutoCompleteLicencas();
    })
  }

  setupAutoCompleteSoftwares(){
    this.softwaresFiltrados = this.vincularLicencaForm.controls['softwareId'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nome)),
      map(nome => (nome ? this._filterSoftware(nome) : this.softwares.slice())),
    );
  }

  setupAutoCompleteLicencas(){
    this.licencasFiltrados = this.vincularLicencaForm.controls['softwareId'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nome)),
      map(nome => (nome ? this._filterLicenca(nome) : this.licencas.slice())),
    );
  }

  private _filterSoftware(nome: string): Software[] {
    const filterValue = nome.toLowerCase();

    return this.softwares.filter(software => software.nome.toLowerCase().includes(filterValue));
  }

  private _filterLicenca(nome: string): Licenca[] {
    const filterValue = nome.toLowerCase();

    return this.licencas.filter(licenca => licenca.nome.toLowerCase().includes(filterValue));
  }

  displayFn(obj: any): string {
    if(obj){
      if(obj.chave){
        return `${obj.nome} - ${obj.chave}`
      }
      return obj.nome
    }

    return ''
  }

  softwareSelecionado(){
    this.vincularLicencaForm.controls['licencaId'].patchValue('');
    this.vincularLicencaForm.controls['licencaId'].enable();
    this.obterLicencas();
  }

  vincularLicenca(){
    const equipamentoId = this.data;
    const licencaId = this.vincularLicencaForm.controls['licencaId'].value.id;

    const dados = {
      equipamentoId,
      licencaId
    }

    this.licencasService.vincularLicenca(dados).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Licença salva com sucesso!')
        this.dialogRef.close('Done!');
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel adicionar a licença. Tente novamente mais tarde.');
        }
      }
    )

  }

  fecharModal(){
    this.dialogRef.close();
  }
}
