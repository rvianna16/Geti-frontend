import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean = false;
  loadingStatus: number = 0;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((isLoading) => {
      if(isLoading){
        this.loadingStatus++
      }else {
        this.loadingStatus = 0;
        this.loading = false;
      }

      if(this.loadingStatus >= 5) {
        this.loading = true;
      }

      this.cd.detectChanges();
    });
  }

}
