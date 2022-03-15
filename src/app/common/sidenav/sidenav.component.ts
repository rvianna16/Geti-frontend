import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showDropdownMenu: boolean = false;

  links: any[] = [
    {
      type: 'link',
      label: 'Home',
      icon: 'home',
      route: '/',
    },
    {
      type: 'dropdown',
      label: 'Contas',
      icon: 'person',
      children: [
        {
          type: 'link',
          label: 'Usuários',
          route: '/usuarios',
        },
        {
          type: 'link',
          label: 'Colaboradores',
          route: '/colaboradores',
        },
      ]
    },
    {
      type: 'link',
      label: 'Equipamentos',
      icon: 'computer',
      route: '/equipamentos',
    },
    {
      type: 'link',
      label: 'Licenças',
      icon: 'vpn_key',
      route: '/licencas',
    },
    {
      type: 'link',
      label: 'Softwares',
      icon: 'build',
      route: '/softwares',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toggleLink() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

}
