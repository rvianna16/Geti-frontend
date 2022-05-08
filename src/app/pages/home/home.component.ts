import { Component, OnInit } from '@angular/core';
import { Contagens } from './models/contagens';
import { ContagensService } from './services/contagens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  contagens: Contagens = {
    colaboradores: 0,
    equipamentos: 0,
    licencas: 0,
    softwares: 0,
  }

  constructor(private contagensService: ContagensService) { }

  ngOnInit(): void {
    this.contagensService.obterContagens().subscribe(res => this.contagens = res);
  }
}
