import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.iterface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  handleBuscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(termino)
      .subscribe(
        (paises) => {
          this.paises = paises;
        },
        (error) => {
          this.hayError = true;
          this.paises = [];
        }
      )
  }

  sugerencias(termino: string){
    this.hayError = false;
  }

}
