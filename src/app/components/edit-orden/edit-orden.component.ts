import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
// import { Form } from 'src/app/models/form';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-orden',
  templateUrl: './edit-orden.component.html',
  styleUrls: ['./edit-orden.component.css']
})
export class EditOrdenComponent implements OnInit, OnDestroy {
  public canvasWidth = 110; // 150
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

  public ax = false;
  public gn = false;
  public qua = false;
  public pav = false;
  public aud = false;
  public mb_ = false;
  public maz = false;
  public pov = false;
  public air = false;
  public eng = false;
  public abs = false;
  public oil = false;
  public hr1 = false;

  public subh: any;

  public thoj = '00:00';
  public tpre = '00:00';
  public tpin = '00:00';
  public tpul = '00:00';
  public tarm = '00:00';
  public tlim = '00:00';

  @ViewChild('sig1') signaturePad: SignaturePad;
  @ViewChild('sig2') signaturePad2: SignaturePad;
  @ViewChild('sig3') signaturePad3: SignaturePad;
  @ViewChild('sig4') signaturePad4: SignaturePad;
  public signaturePadOptions: Object = {
    'minWidth': 0.7,
    'maxWidth': 0.8,
    'penColor': 'rgb(255,0,0)',
    'canvasWidth': 145, // 189
    'canvasHeight': 90 // 125
  };
  save = 2;
  public key = '';
  myForm: FormGroup;
  myForm2: FormGroup;
  uploadedImage: Blob;
  form_ = {
    $key: '',
    orden: null,
    reporte: null,
    estado: '',
    marca: '',
    modelo: '',
    color: '',
    placas: '',
    grua: '',
    km: '',
    serie: '',
    aseg: '',
    sini: '',
    ingreso: '',
    circu: '',
    nombre: '',
    tel: '',
    datos: '',
    obser: '',
    uluces: '',
    qluces: '',
    antena: '',
    espejosl: '',
    crista: '',
    emblem: '',
    moldur: '',
    tapong: '',
    carroc: '',
    claxon: '',
    llantas: '',
    taponer: '',
    centror: '',
    limpia: '',
    espejor: '',
    tablero: '',
    airea: '',
    radio: '',
    bocinas: '',
    encend: '',
    cenice: '',
    cintur: '',
    botoni: '',
    maniji: '',
    vestid: '',
    tapete: '',
    poliza: '',
    tapona: '',
    taponra: '',
    varilla: '',
    filtro: '',
    bateria: '',
    gato: '',
    herram: '',
    trian: '',
    llantar: '',
    exting: '',
    infoa: '',
    cambioaf: false,
    cambioat: false,
    cambioad: false,
    cambioadl: false,
    afinac: false,
    limpiny: false,
    limpca: false,
    cambioan: false,
    cambiolf: false,
    balanc: false,
    alineac: false,
    limpaju: false,
    cambioli: false,
    lavadoc: false,
    lavadom: false,
    pulidoe: false,
    lavadov: false,
    pulidof: false,
    total: '',
    vfecha1: '',
    vnombre1: '',
    vhora1: '',
    vtraba1: '',
    vpreci1: '',
    vfechae1: '',
    vhorae1: '',
    vfirma1: '',
    vfecha2: '',
    vnombre2: '',
    vhora2: '',
    vtraba2: '',
    vpreci2: '',
    vfechae2: '',
    vhorae2: '',
    vfirma2: '',
    gas: null,
    airbag: false,
    engine: false,
    abs: false,
    oil: false,
    axa: false,
    gnp: false,
    qualitas: false,
    pavel: false,
    audi: false,
    mb: false,
    mazda: false,
    povet: false,
    tcar: '',
    dere: '',
    frente: '',
    detras: '',
    izq: '',
    firma1: '',
    firma2: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    img6: '',
    img7: '',
    img8: '',
    hinicio: '',
    hfin: '',
    htiempo: false,
    hnombre: '',
    hfirma1: '',
    hfirma2: '',
    pinicio: '',
    pfin: '',
    ptiempo: false,
    pnombre: '',
    pfirma1: '',
    pfirma2: '',
    piinicio: '',
    pifin: '',
    pitiempo: false,
    pinombre: '',
    pifirma1: '',
    pifirma2: '',
    puinicio: '',
    pufin: '',
    putiempo: false,
    punombre: '',
    pufirma1: '',
    pufirma2: '',
    ainicio: '',
    afin: '',
    atiempo: false,
    anombre: '',
    afirma1: '',
    afirma2: '',
    linicio: '',
    lfin: '',
    ltiempo: false,
    lnombre: '',
    lfirma1: '',
    lfirma2: '',
    proceso: {
        re: false,
        ho: false,
        pr: false,
        pi: false,
        pu: false,
        ar: false,
        li: false,
        te: false,
        sb: false
    },
    tiempoh1: null,
    tiempoh2: null,
    tiempopr1: null,
    tiempopr2: null,
    tiempopi1: null,
    tiempopi2: null,
    tiempopu1: null,
    tiempopu2: null,
    tiempoa1: null,
    tiempoa2: null,
    tiempol1: null,
    tiempol2: null
  };

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public formApi: FormService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.subh) {
      this.subh.unsubscribe();
    }
    const timerh = timer(0, 60000);
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.formApi.GetForm(this.key).valueChanges().subscribe(data => {
      this.form_ = data;
      this.signaturePad.fromDataURL(this.form_.dere);
      this.signaturePad2.fromDataURL(this.form_.frente);
      this.signaturePad3.fromDataURL(this.form_.detras);
      this.signaturePad4.fromDataURL(this.form_.izq);
      this.ax = this.form_.axa;
      this.gn = this.form_.gnp;
      this.qua = this.form_.qualitas;
      this.pav = this.form_.pavel;
      this.aud = this.form_.audi;
      this.mb_ = this.form_.mb;
      this.maz = this.form_.mazda;
      this.pov = this.form_.povet;
      this.air = this.form_.airbag;
      this.eng = this.form_.engine;
      this.abs = this.form_.abs;
      this.oil = this.form_.oil;
      this.needleValue = this.form_.gas;
    //  console.log(this.form_.proceso);
      if (!this.form_.proceso.te && !this.form_.proceso.sb) {
        if (this.form_.tiempoh1 && !this.form_.tiempoh2) {
          this.subh = timerh.subscribe(t => {
            this.thoj = this.calcTiempo(Date.now(), this.form_.tiempoh1);
          //  console.log(t + 'hojalateria' + this.key);
          });
        }
        if (this.form_.tiempopr1 && !this.form_.tiempopr2) {
          this.subh = timerh.subscribe(t => {
            this.tpre = this.calcTiempo(Date.now(), this.form_.tiempopr1);
          //  console.log(t + 'preparacion' + this.key);
          });
        }
        if (this.form_.tiempopi1 && !this.form_.tiempopi2) {
          this.subh = timerh.subscribe(t => {
            this.tpin = this.calcTiempo(Date.now(), this.form_.tiempopi1);
          //  console.log(t + 'pintura');
          });
        }
        if (this.form_.tiempopu1 && !this.form_.tiempopu2) {
          this.subh = timerh.subscribe(t => {
            this.tpul = this.calcTiempo(Date.now(), this.form_.tiempopu1);
          //  console.log(t + 'pulido');
          });
        }
        if (this.form_.tiempoa1 && !this.form_.tiempoa2) {
          this.subh = timerh.subscribe(t => {
            this.tarm = this.calcTiempo(Date.now(), this.form_.tiempoa1);
          //  console.log(t + 'armado');
          });
        }
        if (this.form_.tiempol1 && !this.form_.tiempol2) {
          this.subh = timerh.subscribe(t => {
            this.tlim = this.calcTiempo(Date.now(), this.form_.tiempol1);
          //  console.log(t + 'limpieza');
          });
        }
      }

      if (this.form_.tiempoh1 && this.form_.tiempoh2) {
        this.thoj = this.calcTiempo(this.form_.tiempoh2, this.form_.tiempoh1);
      }
      if (this.form_.tiempopr1 && this.form_.tiempopr2) {
        this.tpre = this.calcTiempo(this.form_.tiempopr2, this.form_.tiempopr1);
      }
      if (this.form_.tiempopi1 && this.form_.tiempopi2) {
        this.tpin = this.calcTiempo(this.form_.tiempopi2, this.form_.tiempopi1);
      }
      if (this.form_.tiempopu1 && this.form_.tiempopu2) {
        this.tpul = this.calcTiempo(this.form_.tiempopu2, this.form_.tiempopu1);
      }
      if (this.form_.tiempoa1 && this.form_.tiempoa2) {
        this.tarm = this.calcTiempo(this.form_.tiempoa2, this.form_.tiempoa1);
      }
      if (this.form_.tiempol1 && this.form_.tiempol2) {
        this.tlim = this.calcTiempo(this.form_.tiempol2, this.form_.tiempol1);
      }
    });
    this.sForm();
  }

  ngOnDestroy() {
    if (this.subh) {
      this.subh.unsubscribe();
    }
  }

  calcTiempo(f: number, fi: number) {
    let t = (f - fi);
    const ms = t % 1000;
    t = (t - ms) / 1000;
    const sg = t % 60;
    t = (t - sg) / 60;
    const mi = t % 60;
    const hr = (t - mi) / 60;
    return this.addZero(hr) + ':' + this.addZero(mi);
  }

  addZero(n) {
    return (n < 10 ? '0' : '') + n;
  }

  submitSurveyData = () => {
    if (this.form_.sini) {
      this.form_.sini = this.form_.sini.toUpperCase();
    }
    this.formApi.UpdateForm(this.form_, this.key);
    this.toastr.success('Actualizado!');
    if (this.subh) {
      this.subh.unsubscribe();
    }
  }

  sForm() {
    this.myForm = this.fb.group({
      orden: ['', [Validators.required]]
    });
    this.myForm2 = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  hacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdateH1({ hnombre: this.form_.hnombre, hfirma1: this.form_.hfirma1, hinicio: fe, tiempoh1: now }, this.key);
    this.toastr.info('Ha iniciado la Hojalatería!');
  }
  hacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdateH2({ img1: this.form_.img1, hfirma2: this.form_.hfirma2, hfin: fe, tiempoh2: now }, this.key);
    this.thoj = this.calcTiempo(now, this.form_.tiempoh1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Hojalatería!');
  }
  pracept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdatePr1({ pnombre: this.form_.pnombre, pfirma1: this.form_.pfirma1, pinicio: fe, tiempopr1: now }, this.key);
    this.toastr.info('Ha iniciado la Preparación!');
  }
  pracept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdatePr2({ img2: this.form_.img2, pfirma2: this.form_.pfirma2, pfin: fe, tiempopr2: now }, this.key);
    this.tpre = this.calcTiempo(now, this.form_.tiempopr1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Preparación!');
  }
  piacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdatePi1({ pinombre: this.form_.pinombre, pifirma1: this.form_.pifirma1, piinicio: fe, tiempopi1: now }, this.key);
    this.toastr.info('Ha iniciado la Pintura!');
  }
  piacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdatePi2({ img3: this.form_.img3, pifirma2: this.form_.pifirma2, pifin: fe, tiempopi2: now }, this.key);
    this.tpin = this.calcTiempo(now, this.form_.tiempopi1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Pintura!');
  }
  puacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdatePu1({ punombre: this.form_.punombre, pufirma1: this.form_.pufirma1, puinicio: fe, tiempopu1: now }, this.key);
    this.toastr.info('Ha iniciado el Pulido!');
  }
  puacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdatePu2({ img4: this.form_.img4, pufirma2: this.form_.pufirma2, pufin: fe, tiempopu2: now }, this.key);
    this.tpul = this.calcTiempo(now, this.form_.tiempopu1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado el Pulido!');
  }
  aacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdateA1({ anombre: this.form_.anombre, afirma1: this.form_.afirma1, ainicio: fe, tiempoa1: now }, this.key);
    this.toastr.info('Ha iniciado el Armado!');
  }
  aacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdateA2({ img5: this.form_.img5, afirma2: this.form_.afirma2, afin: fe, tiempoa2: now }, this.key);
    this.tarm = this.calcTiempo(now, this.form_.tiempoa1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado el Armado!');
  }
  lacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdateL1({ lnombre: this.form_.lnombre, lfirma1: this.form_.lfirma1, linicio: fe, tiempol1: now }, this.key);
    this.toastr.info('Ha iniciado la Limpieza!');
  }
  lacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdateL2({ img6: this.form_.img6, lfirma2: this.form_.lfirma2, lfin: fe, tiempol2: now }, this.key);
    this.tlim = this.calcTiempo(now, this.form_.tiempol1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Limpieza!');
  }

  imgChanged($event) {
    this.form_.firma1 = $event.target.src;
  }
  imgChanged2($event) {
    this.form_.firma2 = $event.target.src;
  }
  imgChanged3($event) {
    this.form_.vfirma1 = $event.target.src;
  }
  imgChanged4($event) {
    this.form_.vfirma2 = $event.target.src;
  }
  imgChanged5($event) {
    if (!this.form_.htiempo) {
      this.form_.hfirma1 = $event.target.src;
    }
  }
  imgChanged6($event) {
    if (this.form_.estado === 'HOJALATERÍA') {
      this.form_.hfirma2 = $event.target.src;
    }
  }
  imgChanged7($event) {
    if (!this.form_.ptiempo) {
      this.form_.pfirma1 = $event.target.src;
    }
  }
  imgChanged8($event) {
    if (this.form_.estado === 'PREPARACIÓN') {
      this.form_.pfirma2 = $event.target.src;
    }
  }
  imgChanged9($event) {
    if (!this.form_.pitiempo) {
      this.form_.pifirma1 = $event.target.src;
    }
  }
  imgChanged10($event) {
    if (this.form_.estado === 'PINTURA') {
      this.form_.pifirma2 = $event.target.src;
    }
  }
  imgChanged11($event) {
    if (!this.form_.putiempo) {
      this.form_.pufirma1 = $event.target.src;
    }
  }
  imgChanged12($event) {
    if (this.form_.estado === 'PULIDO') {
      this.form_.pufirma2 = $event.target.src;
    }
  }
  imgChanged13($event) {
    if (!this.form_.atiempo) {
      this.form_.afirma1 = $event.target.src;
    }
  }
  imgChanged14($event) {
    if (this.form_.estado === 'ARMADO') {
      this.form_.afirma2 = $event.target.src;
    }
  }
  imgChanged15($event) {
    if (!this.form_.ltiempo) {
      this.form_.lfirma1 = $event.target.src;
    }
  }
  imgChanged16($event) {
    if (this.form_.estado === 'LIMPIEZA') {
      this.form_.lfirma2 = $event.target.src;
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0];
    this.ng2ImgMax.resizeImage(ima, 500, 500).subscribe(
      result => {
        this.uploadedImage = result;
        const myReader: FileReader = new FileReader();
        myReader.readAsDataURL(this.uploadedImage);
        myReader.onload = (e) => {
          if (inputValue.name === 'img1') {
            this.form_.img1 = <string>myReader.result;
          }
          if (inputValue.name === 'img2') {
            this.form_.img2 = <string>myReader.result;
          }
          if (inputValue.name === 'img3') {
            this.form_.img3 = <string>myReader.result;
          }
          if (inputValue.name === 'img4') {
            this.form_.img4 = <string>myReader.result;
          }
          if (inputValue.name === 'img5') {
            this.form_.img5 = <string>myReader.result;
          }
          if (inputValue.name === 'img6') {
            this.form_.img6 = <string>myReader.result;
          }
          /* if (inputValue.name === 'img7') {
            this.form_.img7 = <string>myReader.result;
          }
          if (inputValue.name === 'img8') {
            this.form_.img8 = <string>myReader.result;
          } */
          // this.logo = <string>myReader.result;
          this.toastr.success('Imagen cargada correctamente!');
        };
      },
      error => {
        this.toastr.error('Imagen invalida!');
      }
    );
  }

  drawComplete() {
    this.form_.dere = this.signaturePad.toDataURL();
  }
  drawComplete2() {
    this.form_.frente = this.signaturePad2.toDataURL();
  }
  drawComplete3() {
    this.form_.detras = this.signaturePad3.toDataURL();
  }
  drawComplete4() {
    this.form_.izq = this.signaturePad4.toDataURL();
  }
  clear1() {
    this.signaturePad.clear();
    this.form_.dere = this.signaturePad.toDataURL();
  }

  clear2() {
    this.signaturePad2.clear();
    this.form_.frente = this.signaturePad2.toDataURL();
  }

  clear3() {
    this.signaturePad3.clear();
    this.form_.detras = this.signaturePad3.toDataURL();
  }

  clear4() {
    this.signaturePad4.clear();
    this.form_.izq = this.signaturePad4.toDataURL();
  }
  combus(ev) {
    // console.log(ev.srcElement.value);
    this.needleValue = ev.srcElement.value;
  }

  axa() {
    this.ax = !this.ax;
    this.form_.axa = !this.form_.axa;
  }

  gnp() {
    this.gn = !this.gn;
    this.form_.gnp = !this.form_.gnp;
  }

  qualitas() {
    this.qua = !this.qua;
    this.form_.qualitas = !this.form_.qualitas;
  }

  pavel() {
    this.pav = !this.pav;
    this.form_.pavel = !this.form_.pavel;
  }

  audi() {
    this.aud = !this.aud;
    this.form_.audi = !this.form_.audi;
  }

  mb() {
    this.mb_ = !this.mb_;
    this.form_.mb = !this.form_.mb;
  }

  mazda() {
    this.maz = !this.maz;
    this.form_.mazda = !this.form_.mazda;
  }
  povet() {
    this.pov = !this.pov;
    this.form_.povet = !this.form_.povet;
  }

  airbag() {
    this.air = !this.air;
    this.form_.airbag = !this.form_.airbag;
  }

  engine() {
    this.eng = !this.eng;
    this.form_.engine = !this.form_.engine;
  }

  abs_() {
    this.abs = !this.abs;
    this.form_.abs = !this.form_.abs;
  }

  oil_() {
    this.oil = !this.oil;
    this.form_.oil = !this.form_.oil;
  }

}
