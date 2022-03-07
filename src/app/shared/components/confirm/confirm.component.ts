import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmData {
  mensagem: string,
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})

export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData
    ) { }

  ngOnInit(): void {
  }

  confirmar(){
    this.dialogRef.close(true)
  }

  fecharModal(){
    this.dialogRef.close(false);
  }
}
