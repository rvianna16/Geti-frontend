import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
      this.cd.detectChanges();
    });
  }

}
