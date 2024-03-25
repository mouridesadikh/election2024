import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.css']
})
export class CartographieComponent {
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
  constructor(private httpService : HttpService){
    this.fetchRegion();
    this.getRecup();
  }

  ngOnInit(): void {
      this.dtOptions = {
        responsive : true,
        order : undefined
      }
    
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
        console.log("ddddd",this.allResultatByCandidat);
        
        this.allResultatByCandidat = this.allResultatByCandidat.sort((a,b) => b.nb - a.nb );
        
        
     
       })
       
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
    return '1px solid #' + ('000000' + color).slice(-6);
  }

  showInfos(data:any){
      this.totalCom = 0;
      this.totalDep = 0;
      this.allResultatByCandidatCom = [];
      this.allResultatByCandidatDep = [];
      console.log(data);
      
      this.httpService.getResultatByRegionIdAndCandidatId(data.regionId,data.candidatId).subscribe((rs:any)=>{
                  this.allResultatByCandidatCom = rs.com;
                  this.allResultatByCandidatDep = rs.dep;
                  this.allResultatByCandidatCom.forEach((x)=>{this.totalCom = this.totalCom + parseInt(x.nb)});
                  this.allResultatByCandidatDep.forEach((x)=>{this.totalDep = this.totalDep + parseInt(x.nb)});

                   
      });
  }
  
}
