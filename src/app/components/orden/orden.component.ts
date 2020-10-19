import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import 'fecha';
import fechaObj from 'fecha';
import { CurrencyPipe } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  public canvasWidth = 150; // 150
  public needleValue = 50;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['red', 'yellow', 'green'],
    arcDelimiters: [33, 67],
    rangeLabel: ['E', 'F'],
    needleStartValue: 60,
  };

  totalRef = 0;
  obra = 0;
  otros = 0;
  cargos = 0;
  seguro = 0;
  subtotal = 0;
  iva = 0;
  total = 0;
  anticipo = 0;
  saldo = 0;
  myformValuesChanges$;
  uploadedImage: Blob;
  public filePathI1 = '';
  public filePathI2 = '';
  public filePathI3 = '';
  public filePathI4 = '';
  public filePathf1 = '';
  public filePathf2 = '';
  public filePathf3 = '';
  public filePathf4 = '';
  public filePathf5 = '';
  fecha: string;
  combust: number;
  @ViewChild('sig1') signaturePad: SignaturePad;
  @ViewChild('sig2') signaturePad2: SignaturePad;
  @ViewChild('sig3') signaturePad3: SignaturePad;
  @ViewChild('sig4') signaturePad4: SignaturePad;
  public signaturePadOptions: object = {
    minWidth: 0.7,
    maxWidth: 0.8,
    penColor: 'rgb(255,0,0)',
    canvasWidth: 189,
    canvasHeight: 125
  };
  save = 0;
  myForm: FormGroup;
  // myForm2: FormGroup;
  // uploadedImage: Blob;
 

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public formApi: FormService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private currencyPipe: CurrencyPipe,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.formApi.GetFormsList();
    this.sForm();
    this.fecha = fechaObj.format(new Date(), 'D [de] MMMM [de] YYYY');
    this.myForm.patchValue({fecha: this.fecha});
    this.generRow();
    this.myformValuesChanges$ = this.myForm.controls['units'].valueChanges;
    this.myformValuesChanges$.subscribe(units => {
      this.updateTotalUnitPrice(units);
    });
  }

  ResetForm() {
    this.myForm.reset();
    this.myForm.patchValue({fecha: this.fecha});
    this.myForm.patchValue({tcar: 'sedan'});
    // this.myForm2.reset();
  }

  submitSurveyData = () => {
    this.formApi.AddForm(this.myForm.value);
    this.toastr.success('Guardado!');
    this.needleValue = 50;
    this.clear1();
    this.clear2();
    this.clear3();
    this.clear4();
    this.ResetForm();
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      fecha: [''],
      lugar: [''],
      domi: [''],
      rfc: [''],
      garan: [''],
      ciudad: [''],
      cp: [''],
      correo: [''],
      tel: [''],
      marca: [''],
      modelo: [''],
      color: [''],
      placas: [''],
      anio: [''],
      km: [''],
      serie: [''],
      tipo: [''],
      nomotor: [''],
      ingreso: [''],
      ihora: [''],
      entrega: [''],
      ehora: [''],
      asesor: [''],
      dere: [[]],
      frente: [[]],
      detras: [[]],
      izq: [[]],
      uluces: [true],
      qluces: [true],
      antena: [true],
      espejol: [true],
      crista: [true],
      emblem: [true],
      llantas: [true],
      taponr: [true],
      bocinac: [true],
      limpia: [true],
      instru: [true],
      calef: [true],
      radio: [true],
      bocinas: [true],
      encend: [true],
      espejor: [true],
      cenic: [true],
      cintu: [true],
      botoni: [true],
      maniji: [true],
      tapet: [true],
      gato: [true],
      manerg: [true],
      llaver: [true],
      estuch: [true],
      triang: [true],
      llantar: [true],
      exting: [true],
      filtro: [true],
      taponv: [true],
      tradia: [true],
      acumul: [true],
      descri: [''],
      plazo: [''],
      diagn: [''],
      riesg: [''],
      firmae: [''],
      firmac: [''],
      costo: [''],
      refac: [''],
      manoo: [0],
      cargos: [0],
      seguro: [0],
      otrosm: [0],
      antici: [0],
      desc1: [''],
      desc2: [''],
      desc3: [''],
      desc4: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      ctel: [''],
      ccorreo: [''],
      chora1: [''],
      chora2: [''],
      ccalle: [''],
      cnum: [''],
      ccolon: [''],
      cdeleg: [''],
      cseguro: [''],
      cpoliz: [''],
      ccompa: [''],
      caviso: [''],
      ctribu: [''],
      cciudad: [''],
      cdias: [''],
      cmes: [''],
      canio: [''],
      cfirmap: [''],
      cfirmac: [''],
      cfirmac2: [''],
      cacept1: [''],
      cacept2: [''],
      tcar: ['sedan'],
      siem: [''],
      presu: [''],
      vigen: [''],
      gas: [50],
      units: this.fb.array([
        this.getUnit()
      ]),
      hinicio: [''],
      hfin: [''],
      htiempo: [false],
      hnombre: [''],
      hfirma1: [''],
      hfirma2: [''],
      pinicio: [''],
      pfin: [''],
      ptiempo: [false],
      pnombre: [''],
      pfirma1: [''],
      pfirma2: [''],
      piinicio: [''],
      pifin: [''],
      pitiempo: [false],
      pinombre: [''],
      pifirma1: [''],
      pifirma2: [''],
      puinicio: [''],
      pufin: [''],
      putiempo: [false],
      punombre: [''],
      pufirma1: [''],
      pufirma2: [''],
      ainicio: [''],
      afin: [''],
      atiempo: [false],
      anombre: [''],
      afirma1: [''],
      afirma2: [''],
      linicio: [''],
      lfin: [''],
      ltiempo: [false],
      lnombre: [''],
      lfirma1: [''],
      lfirma2: [''],
      proceso: {
        re: [false],
        ho: [false],
        pr: [false],
        pi: [false],
        pu: [false],
        ar: [false],
        li: [false],
        te: [false],
        sb: [false]
      },
      tiempoh1: [null],
      tiempoh2: [null],
      tiempopr1: [null],
      tiempopr2: [null],
      tiempopi1: [null],
      tiempopi2: [null],
      tiempopu1: [null],
      tiempopu2: [null],
      tiempoa1: [null],
      tiempoa2: [null],
      tiempol1: [null],
      tiempol2: [null],
      estado: 'RECEPCIÓN'
    });
  }

  /* combus(ev) {
    // console.log(ev.srcElement.value);
    this.needleValue = ev.srcElement.value;
  } */
  updt() {
    /* this.subtotal = this.totalRef + this.obra + this.otros; */
    this.subtotal = this.totalRef + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    this.iva = Math.round(this.subtotal * 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.myForm.get('antici').value;
  }
  private generRow() {
    for (let i = 1; i < 9; i++) {
      this.addUnit();
    }
  }

  private getUnit() {
    return this.fb.group({
      cantidad: [''],
      precio: [''],
      parte: [''],
      importe: [''],
      desc: ['']
    });
  }

  private addUnit() {
    const control = this.myForm.controls['units'] as FormArray;
    control.push(this.getUnit());
  }

  getControls(frmGrp: FormGroup, key: string) {
    return (frmGrp.controls[key] as FormArray).controls;
  }

  private updateTotalUnitPrice(units: any) {
    const control = this.myForm.controls['units'] as FormArray;
    this.totalRef = 0;
    // tslint:disable-next-line: forin
    for (let i in units) {
      let totalRefUnitPrice = 0;
      totalRefUnitPrice = ((units[i].cantidad > 0 && units[i].precio > 0) ? units[i].cantidad * units[i].precio : 0);
      // let totalRefUnitPrice = (units[i].cantidad * units[i].precio);
      const totalUnitPriceFormatted = this.currencyPipe.transform(totalRefUnitPrice, 'USD', 'symbol-narrow', '1.2-2');

      if (totalRefUnitPrice !== 0) {
        control.at(+i).get('importe').setValue(totalUnitPriceFormatted, {onlySelf: true, emitEvent: false});
      } else {
        control.at(+i).get('importe').setValue('', {onlySelf: true, emitEvent: false});
      }
      /* if (totalRefUnitPrice != 0)
        control.at(+i).get('importe').setValue(totalRefUnitPrice, { onlySelf: true, emitEvent: false }); */
      this.totalRef += totalRefUnitPrice;
    }
    this.subtotal = this.totalRef + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    this.iva = Math.round(this.subtotal * 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.anticipo;
  }


  imgChanged($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      this.filePathf1 = `signs_gutmar/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf1);
      this.storage.upload(this.filePathf1, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({ firmac: url });
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }
  imgChanged2($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      this.filePathf2 = `signs_gutmar/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf2);
      this.storage.upload(this.filePathf2, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({ firmae: url });
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }
  /* imgChanged3($event) {
    this.form_.vfirma1 = $event.target.src;
  }
  imgChanged4($event) {
    this.form_.vfirma2 = $event.target.src;
  }
  imgChanged5($event) {
    this.form_.hfirma1 = $event.target.src;
    if (this.form_.hfirma1) {
      console.log(this.form_.hfirma1);
    }
  }
  imgChanged6($event) {
    this.form_.hfirma2 = $event.target.src;
  } */

   b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  changeListener($event): void {
    this.readThis($event.target);
    // console.log($event.target.name);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0];
    const reader = new FileReader();
    if (ima) {
      reader.readAsDataURL(ima);
    }

    reader.onloadend = () => {
      const imgURL = reader.result as string;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      this.uploadedImage = this.b64toBlob(realData, contentType);
      if (inputValue.name === 'img1') {
        if (this.filePathI1 !== '') {
          const ref = this.storage.ref(this.filePathI1);
          ref.delete();
        }
        this.filePathI1 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI1);
        this.storage.upload(this.filePathI1, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img1: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img2') {
        if (this.filePathI2 !== '') {
          const ref = this.storage.ref(this.filePathI2);
          ref.delete();
        }
        this.filePathI2 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI2);
        this.storage.upload(this.filePathI2, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img2: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img3') {
        if (this.filePathI3 !== '') {
          const ref = this.storage.ref(this.filePathI3);
          ref.delete();
        }
        this.filePathI3 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI3);
        this.storage.upload(this.filePathI3, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img3: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img4') {
        if (this.filePathI4 !== '') {
          const ref = this.storage.ref(this.filePathI4);
          ref.delete();
        }
        this.filePathI4 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI4);
        this.storage.upload(this.filePathI4, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img4: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
    };
  }

  drawComplete() {
    this.myForm.patchValue({dere: this.signaturePad.toData()});
  }
  drawComplete2() {
    this.myForm.patchValue({frente: this.signaturePad2.toData()});
  }
  drawComplete3() {
    this.myForm.patchValue({detraa: this.signaturePad3.toData()});
  }
  drawComplete4() {
    this.myForm.patchValue({izq: this.signaturePad4.toData()});
  }
  clear1() {
    this.signaturePad.clear();
    this.myForm.patchValue({dere: []});
  }

  clear2() {
    this.signaturePad2.clear();
    this.myForm.patchValue({frente: []});
  }

  clear3() {
    this.signaturePad3.clear();
    this.myForm.patchValue({detras: []});
  }

  clear4() {
    this.signaturePad4.clear();
    this.myForm.patchValue({izq: []});
  }
  combus(ev) {
    // console.log(ev.srcElement.value);
    this.needleValue = ev.srcElement.value;
  }
  car(ev) {
    console.log(ev.srcElement.value);
  }

}
