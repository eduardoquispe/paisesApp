import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.iterface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li.list-group-item {
      cursor: pointer;
    }
  `]
})
export class PorPaisComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarPaisesSugeridos = false;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  handleBuscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarPaisesSugeridos = false;
    this.paisService.buscarPais(termino)
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
    this.termino = termino;
    this.mostrarPaisesSugeridos = true;

    if(termino === '')
    {
      this.mostrarPaisesSugeridos = false;
    }

    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0,5),
        error => this.paisesSugeridos = []
      );
  }
}
