import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.iterface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa','americas','asia','europe','oceania'];
  regionActiva: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisesService: PaisService) { }

  ngOnInit(): void {
  }

  getClaseCss(region: string) {
    let clase = 'btn';
    clase = `${clase} ${region === this.regionActiva ? 'btn-primary' : 'btn-outline-primary'}`;
    return clase;
  }

  activarRegion(region: string) {
    if(region === this.regionActiva) return;
    this.hayError = false;
    this.regionActiva = region;
    this.paisesService.buscarRegion(region)
      .subscribe(
        paises => this.paises = paises,
        error => {
          this.hayError = true;
          this.paises = [];
        }
      );
  }
}
