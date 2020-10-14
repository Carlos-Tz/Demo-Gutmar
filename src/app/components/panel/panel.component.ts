import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  Form: Form[];
  save = 1;
  data_ = false;
  public dtOptions = {};

  constructor(
    public formApi: FormService,
    private location: Location
  ) { }

  ngOnInit() {

    this.formApi.GetFormsList().snapshotChanges().subscribe(data => {
      this.Form = [];
      data.forEach(item => {
        let form_ = item.payload.toJSON();
        form_['$key'] = item.key;
        this.Form.push(form_ as Form);
      //  this.l1.push(form_);
      });
      this.data_ = true;
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        /* {
          extend: 'print',
          title: 'Hazlo Volkswagen a ' + this.fecha,
          text: 'Imprimir tabla'
        },
        {
          extend: 'excel',
          title: 'Hazlo Volkswagen a ' + this.fecha,
          text: 'Exportar a Excel'
        } */
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
