import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { Pieza } from 'src/app/models/pieza';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  Part: Pieza[];
  save = 1;
  data_ = false;
  myForm: FormGroup;
  public dtOptions = {};

  constructor(
    private fb: FormBuilder,
    public formApi: FormService,
    private location: Location,
    public toastr: ToastrService
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
    this.sForm();

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

  submitSurveyData = () => {
    this.formApi.AddPart(this.myForm.value);
    this.toastr.success('Guardado!');
    this.ResetForm();
  }
  ResetForm() {
    this.myForm.reset();
    // this.myForm2.reset();
  }

  sForm() {
    this.myForm = this.fb.group({
      clave: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });
  }
  goBack = () => {
    this.location.back();
  }
}
