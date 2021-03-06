import { Unit } from './unit';

export interface Form {
    $key: string;
    nombre: string;
    orden: number;
    fecha: string;
    lugar: string;
    domi: string;
    rfc: string;
    garan: string;
    ciudad: string;
    cp: string;
    correo: string;
    tel: string;
    marca: string;
    modelo: string;
    color: string;
    placas: string;
    anio: string;
    km: string;
    serie: string;
    tipo: string;
    nomotor: string;
    ingreso: string;
    ihora: string;
    entrega: string;
    ehora: string;
    asesor: string;
    dere: [[]];
    frente: [[]];
    detras: [[]];
    izq: [[]];
    uluces: boolean;
    qluces: boolean;
    antena: boolean;
    espejol: boolean;
    crista: boolean;
    emblem: boolean;
    llantas: boolean;
    taponr: boolean;
    bocinac: boolean;
    limpia: boolean;
    instru: boolean;
    calef: boolean;
    radio: boolean;
    bocinas: boolean;
    encend: boolean;
    espejor: boolean;
    cenic: boolean;
    cintu: boolean;
    botoni: boolean;
    maniji: boolean;
    tapet: boolean;
    gato: boolean;
    manerg: boolean;
    llaver: boolean;
    estuch: boolean;
    triang: boolean;
    llantar: boolean;
    exting: boolean;
    filtro: boolean;
    taponv: boolean;
    tradia: boolean;
    acumul: boolean;
    descri: string;
    plazo: string;
    diagn: string;
    riesg: string;
    firmae: string;
    firmac: string;
    costo: string;
    refac: string;
    manoo: number;
    cargos: number;
    seguro: number;
    otrosm: number;
    antici: number;
    desc1: string;
    desc2: string;
    desc3: string;
    desc4: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    ctel: string;
    ccorreo: string;
    chora1: string;
    chora2: string;
    ccalle: string;
    cnum: string;
    ccolon: string;
    cdeleg: string;
    cseguro: string;
    cpoliz: string;
    ccompa: string;
    caviso: string;
    ctribu: string;
    cciudad: string;
    cdias: string;
    cmes: string;
    canio: string;
    cfirmap: string;
    cfirmac: string;
    cfirmac2: string;
    cacept1: string;
    cacept2: string;
    tcar: string;
    siem: string;
    presu: string;
    vigen: string;
    gas: number;
    units: Unit[];
    hinicio: string;
    hfin: string;
    htiempo: boolean;
    hnombre: string;
    hfirma1: string;
    hfirma2: string;
    pinicio: string;
    pfin: string;
    ptiempo: boolean;
    pnombre: string;
    pfirma1: string;
    pfirma2: string;
    piinicio: string;
    pifin: string;
    pitiempo: boolean;
    pinombre: string;
    pifirma1: string;
    pifirma2: string;
    puinicio: string;
    pufin: string;
    putiempo: boolean;
    punombre: string;
    pufirma1: string;
    pufirma2: string;
    ainicio: string;
    afin: string;
    atiempo: boolean;
    anombre: string;
    afirma1: string;
    afirma2: string;
    linicio: string;
    lfin: string;
    ltiempo: boolean;
    lnombre: string;
    lfirma1: string;
    lfirma2: string;
    proceso: {
        re: boolean;
        ho: boolean;
        pr: boolean;
        pi: boolean;
        pu: boolean;
        ar: boolean;
        li: boolean;
        te: boolean;
        sb: boolean;
    };
    tiempoh1: number;
    tiempoh2: number;
    tiempopr1: number;
    tiempopr2: number;
    tiempopi1: number;
    tiempopi2: number;
    tiempopu1: number;
    tiempopu2: number;
    tiempoa1: number;
    tiempoa2: number;
    tiempol1: number;
    tiempol2: number;
    estado: string;
}
