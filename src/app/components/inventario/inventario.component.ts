import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { Pieza } from 'src/app/models/pieza';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  Part: Pieza[];
  save = 1;
  data_ = false;
  public dtOptions = {};

  constructor(
    public formApi: FormService,
    private location: Location
  ) { }

  ngOnInit() {

    this.formApi.GetPartsList().snapshotChanges().subscribe(data => {
      this.Part = [];
      data.forEach(item => {
        let part_ = item.payload.toJSON();
        part_['$key'] = item.key;
        this.Part.push(part_ as Pieza);
      //  this.l1.push(form_);
      });
      this.data_ = true;
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
      ],
      language: {
        paginate: {
            first:    '«',
            previous: '‹',
            next:     '›',
            last:     '»'
        },
        aria: {
            paginate: {
                first:    'Primero',
                previous: 'Anterior',
                next:     'Siguiente',
                last:     'Último'
            }
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
        search: 'Buscar',
        emptyTable: ' '
      },
      info: false
    };
  }


  goBack = () => {
    this.location.back();
  }
}
