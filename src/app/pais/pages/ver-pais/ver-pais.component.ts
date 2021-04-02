import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.iterface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  hayError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(
          switchMap(({ idPais }) => this.paisService.getPaisPorAlpha(idPais))
          // tap(console.log)
        )
      .subscribe(
        resp => this.pais = resp,
        error => {
          this.hayError = true;
        }
      );
  }
}