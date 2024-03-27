import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { map } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cartographie',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.css']
})
export class CartographieComponent {
  chartOption : any;
  allRegionWithResult  : any [] = [];
  louga  : any ;
  dakar  : any ;
  thies : any;
  diourbel : any;
  fatick :any;
  kedougou : any;
  kaffrine :any;
  kaolack:any;
  kolda :any;
  tambacounda :any;
  matam :any;
  sedhiou : any;
  saintLouis:any;
  ziguinchor:any;

  allResultatByCandidat : any [] = [];
  allResultatByCandidatDep : any [] = [];
  allResultatByCandidatCom : any [] = [];
  nomRegion : string = "";
  idRegion : number = 0;
  totalDep : number = 0;
  totalCom : number = 0;
  dtOptions: DataTables.Settings = {};
  nomTotalDevotePArRegion : number = 0;
  nbrVotant: number = 0;
  maClasse: string = 'land';
  dashboardData:any  = {};
  @ViewChild('idDakar') dakarPathRef!: ElementRef;
  @ViewChild('idDiourbel') diourbelPathRef!: ElementRef;
  @ViewChild('idFatick') fatickPathRef!: ElementRef;
  @ViewChild('idKedougou') kedougouPathRef!: ElementRef;
  @ViewChild('idKaffrine') kaffrinePathRef!: ElementRef;
  @ViewChild('idKaolack') kaolackPathRef!: ElementRef;
  @ViewChild('idKolda') koldaPathRef!: ElementRef;
  @ViewChild('idLouga') lougaPathRef!: ElementRef;
  @ViewChild('idMatam') matamPathRef!: ElementRef;
  @ViewChild('idSedhiou') sedhiouPathRef!: ElementRef;
  @ViewChild('idSaint') saintPathRef!: ElementRef;
  @ViewChild('idTamba') tambaPathRef!: ElementRef;
  @ViewChild('idThies') thiesPathRef!: ElementRef;
  @ViewChild('idZig') zigPathRef!: ElementRef;
   candidats = [
    {
        title: 'Aliou Mamadou DIA',
        color: '#06650c',
        name: 'aliou'
    },
    {
        title: 'Aly Ngouille NDIAYE',
        color: '#5d7f4e',
        name: 'aly'
    },
    {
        title: 'Amadou BA',
        color: '#7a4d30',
        name: 'amadou'
    },
    {
        title: 'Anta Babacar NGOM',
        color: '#2a8c3e',
        name: 'anta'
    },
    {
        title: 'Bassirou Diomaye Diakhar FAYE',
        color: '#0083a4',
        name: 'bassirou'
    },
    {
        title: 'Boubacar CAMARA',
        color: '#cd221c',
        name: 'boubacar'
    },
    {
        title: 'Cheikh Tidiane DIÈYE',
        color: '#1b1a53',
        name: 'cheikh'
    },
    {
        title: 'Daouda NDIAYE',
        color: '#0a66b2',
        name: 'daouda'
    },
    {
        title: 'Déthié FALL',
        color: '#f4b822',
        name: 'dethie'
    },
    {
        title: 'EL Hadji Malick GAKOU',
        color: '#e00314',
        name: 'malick'
    },
    {
        title: 'El Hadji Mamadou DIAO',
        color: '#7030a0',
        name: 'mamadou'
    },
    {
        title: 'Habib SY',
        color: '#0083a4',
        name: 'habib'
    },
    {
        title: 'Idrissa SECK',
        color: '#690007',
        name: 'idrissa'
    },
    {
        title: 'Khalifa Ababacar SALL',
        color: '#06603d',
        name: 'khalifa'
    },
    {
        title: 'Mahammed Boun Abdallah DIONNE',
        color: '#0c8e36',
        name: 'abdallah'
    },
    {
        title: 'Mamadou Lamine DIALLO',
        color: '#f9e933',
        name: 'lamine'
    },
    {
        title: 'Papa Djibril FALL',
        color: '#011c40',
        name: 'djibril'
    },
    {
        title: 'Serigne MBOUP',
        color: '#0083a4',
        name: 'serigne'
    },
    {
        title: 'Thierno Alassane SALL',
        color: '#37abe2',
        name: 'alassane'
    }
];

  constructor(private httpService : HttpService){

    this.fetchRegion();
    this.getRecup();
    
  }

  ngOnInit(): void {
   
    this.getDashBoard();
    
  }

  getDashBoard(){
     this.httpService.getDashboard().subscribe((rs:any) =>{
         this.dashboardData = rs;
         console.log("dashboard",rs);
         
     })
  }

  getRecup(){
   
    this.httpService.getResultat().subscribe((rs:any)=>{
      
      this.nomRegion = "National";
      this.allResultatByCandidat = rs.rtsParCandidats;

      
      this.allResultatByCandidat = this.allResultatByCandidat.sort((a,b) => b.nb - a.nb);
     
      
     
      this.nomTotalDevotePArRegion = rs.nbrVotant;    

       });
  
}


  getInfos(data:any){
   
    this.totalCom = 0;
    this.totalDep = 0;
    this.allResultatByCandidatCom = [];
    this.allResultatByCandidatDep = [];
      this.nomRegion = data.nom;
      this.idRegion = data.id;
      this.httpService.getResultatByRegionId(data.id).subscribe((rs:any)=>{
        let recup : any = JSON.parse(rs);
        this.nomTotalDevotePArRegion = 0;
        recup.forEach((el:any) => {
          this.nomTotalDevotePArRegion = this.nomTotalDevotePArRegion + Number(el.nb);
       });
   
       
        this.allResultatByCandidat = JSON.parse(rs);
        
        
        this.allResultatByCandidat = this.allResultatByCandidat.sort((a,b) => b.nb - a.nb );
        
        
     
       })
       
  }
  ngAfterViewInit() {
       this.changeColor();
       
  }

  changeColor(){
    this.httpService.getDataFromDiagram().subscribe((processedData: any) => {
          let recupdata : any =  this.getMaxPercentages(processedData);
        
           
          if(recupdata['FATICK']){
               this.candidats.forEach(rs=>{
                    if(recupdata['FATICK']['candidat'] == rs['title']){
                      let fatickPathRef = this.fatickPathRef.nativeElement;
                      fatickPathRef.setAttribute('class', rs['name']);
                    }
               })

          }

          if(recupdata['KAOLACK']){
            this.candidats.forEach(rs=>{
             
                 if(recupdata['KAOLACK']['candidat'] == rs['title']){
                  
                   let kaolackPathRef = this.kaolackPathRef.nativeElement;
                  
                   kaolackPathRef.setAttribute('class', rs['name']);
                   
                    
                 }
            })

           }
           
          if(recupdata['KEDOUGOU']){
            this.candidats.forEach(rs=>{
                 if(recupdata['KEDOUGOU']['candidat'] == rs['title']){
                   let kedougouPathRef = this.kedougouPathRef.nativeElement;
                   kedougouPathRef.setAttribute('class', rs['name']);
                 }
            })

          }

          if(recupdata['MATAM']){
            this.candidats.forEach(rs=>{
                 if(recupdata['MATAM']['candidat'] == rs['title']){
                   let matamPathRef = this.matamPathRef.nativeElement;
                   matamPathRef.setAttribute('class', rs['name']);
                 }
            })

          }
          if(recupdata['SEDHIOU']){
            this.candidats.forEach(rs=>{
                 if(recupdata['SEDHIOU']['candidat'] == rs['title']){
                   let sedhiouPathRef = this.sedhiouPathRef.nativeElement;
                   sedhiouPathRef.setAttribute('class', rs['name']);
                 }
            })

          }
          if(recupdata['THIES']){
            this.candidats.forEach(rs=>{
                 if(recupdata['THIES']['candidat'] == rs['title']){
                   let thiesPathRef = this.thiesPathRef.nativeElement;
                   thiesPathRef.setAttribute('class', rs['name']);
                 }
            })

          }

          if(recupdata['DAKAR']){
            this.candidats.forEach(rs=>{
                 if(recupdata['DAKAR']['candidat'] == rs['title']){
                   let dakarPathRef = this.dakarPathRef.nativeElement;
                   dakarPathRef.setAttribute('class', rs['name']);
                 }
            })

          }
          if(recupdata['LOUGA']){
            this.candidats.forEach(rs=>{
                 if(recupdata['LOUGA']['candidat'] == rs['title']){
                   let lougaPathRef = this.lougaPathRef.nativeElement;
                   lougaPathRef.setAttribute('class', rs['name']);
                 }
            })
          }
          if(recupdata['SAINT LOUIS']){
            this.candidats.forEach(rs=>{
                 if(recupdata['SAINT LOUIS']['candidat'] == rs['title']){
                   let saintPathRef = this.saintPathRef.nativeElement;
                   saintPathRef.setAttribute('class', rs['name']);
                 }
            })
          }

          if(recupdata['DIOURBEL']){
            this.candidats.forEach(rs=>{
                 if(recupdata['DIOURBEL']['candidat'] == rs['title']){
                   let diourbelPathRef = this.diourbelPathRef.nativeElement;
                   diourbelPathRef.setAttribute('class', rs['name']);
                 }
            })
          }

          if(recupdata['ZIGUINCHOR']){
            this.candidats.forEach(rs=>{
                 if(recupdata['ZIGUINCHOR']['candidat'] == rs['title']){
                   let zigPathRef = this.zigPathRef.nativeElement;
                   zigPathRef.setAttribute('class', rs['name']);
                 }
            })
          }

          if(recupdata['KOLDA']){
            this.candidats.forEach(rs=>{
                 if(recupdata['KOLDA']['candidat'] == rs['title']){
                   let koldaPathRef = this.koldaPathRef.nativeElement;
                   koldaPathRef.setAttribute('class', rs['name']);
                 }
            })
          }

          if(recupdata['TAMBACOUNDA']){
            this.candidats.forEach(rs=>{
                 if(recupdata['TAMBACOUNDA']['candidat'] == rs['title']){
                   let tambaPathRef = this.tambaPathRef.nativeElement;
                   tambaPathRef.setAttribute('class', rs['name']);
                 }
            })
          }

          if(recupdata['KAFFRINE']){
            this.candidats.forEach(rs=>{
                 if(recupdata['KAFFRINE']['candidat'] == rs['title']){
                   let kaffrinePathRef = this.kaffrinePathRef.nativeElement;
                   kaffrinePathRef.setAttribute('class', rs['name']);
                 }
            })
          }
          
        
           
      });
  }


  getMaxPercentages(data: any[]): any {
    let percentagesMax:any = {};
    data.forEach(candidatData => {
      let candidat = candidatData.candidat;
      candidatData.regions.forEach((regionData:any) => {
        let region : any = regionData.region;
        let percentage : any = regionData.percentage;
        if (!percentagesMax[region] || percentage > percentagesMax[region].percentage) {
          percentagesMax[region] = { candidat, percentage };
        }
      });
    });
    return percentagesMax;
  }

  fetchRegion(){
    this.httpService.getResultatRegion().subscribe((rs:any)=>{
            
      this.allRegionWithResult = JSON.parse(rs);
  
      this.allRegionWithResult.forEach(element => {
         if(element.nom === "LOUGA"){
          this.louga = element;
         }
         if(element.nom === "DAKAR"){
          this.dakar = element;
         }
         if(element.nom === "THIES"){
          this.thies = element;
         }
         if(element.nom === "DIOURBEL"){
          this.diourbel = element;
         }
         if(element.nom === "FATICK"){
          this.fatick = element;
         }
         if(element.nom === "KEDOUGOU"){
          this.kedougou = element;
         }
         if(element.nom === "KAFFRINE"){
          this.kaffrine = element;
         }
         if(element.nom === "KAOLACK"){
          this.kaolack = element;
         }
         if(element.nom === "KOLDA"){
          this.kolda = element;
         }
         if(element.nom === "TAMBACOUNDA"){
          this.tambacounda = element;
         }
         if(element.nom === "MATAM"){
          this.matam = element;
         }
         if(element.nom === "SEDHIOU"){
          this.sedhiou = element;
         }
         if(element.nom === "SAINT LOUIS"){
          this.saintLouis = element;
         }
         if(element.nom === "ZIGUINCHOR"){
          this.ziguinchor = element;
         }
      });
      
     
    
     });

  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '3px solid #' + ('000000' + color).slice(-6);
  }

  // showInfos(data:any){
  //     this.totalCom = 0;
  //     this.totalDep = 0;
  //     this.allResultatByCandidatCom = [];
  //     this.allResultatByCandidatDep = [];
    
      
  //     this.httpService.getResultatByRegionIdAndCandidatId(data.regionId).subscribe((rs:any)=>{
  //                 this.allResultatByCandidatCom = rs.com;
  //                 this.allResultatByCandidatDep = rs.dep;
  //                 this.allResultatByCandidatCom.forEach((x)=>{this.totalCom = this.totalCom + parseInt(x.nb)});
  //                 this.allResultatByCandidatDep.forEach((x)=>{this.totalDep = this.totalDep + parseInt(x.nb)});

                   
  //     });
  // }




  
}
