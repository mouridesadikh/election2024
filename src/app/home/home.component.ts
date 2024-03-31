import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { map,forkJoin } from 'rxjs';
import { error } from 'jquery';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allResultatsByCandidats : any [] = [];
  nbrVotant : number = 0;

  
  chartOptions : any;
  dashboardData : any = {};
 
  constructor(private httpService : HttpService){
      this.getData();
     
      this.getRecup();
      
      // setInterval(()=>{
      //     this.getRecup();
      // },1000);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.getData();
     this.getDashBoard();
  }

  getData()
  {
    this.httpService.getDataFromDiagram().pipe(
        map((rs: any) => {
          console.log("eeeeeee",rs);
          
           let data = {
              animationEnabled: true,
              exportEnabled: true,
      
              title:{
                text: ""   
              },
              axisX:{
                title: "Régions"
              },
              axisY:{
                title: "Pourcentage"
              },
              toolTip:  {
                shared: true
              },
              legend: {
                horizontalAlign: "top",
                verticalAlign: "center",
                reversed: true        
              },
              data: this.formatData(rs)
            };
            console.log("resultat",data);
            
            return data;
        })
    ).subscribe((processedData: any) => {
        this.chartOptions = processedData;
    });
   

    console.log('====================================');
    console.log(this.chartOptions);
    console.log('====================================');
  }


  formatData(jsonData: any): any[] {
   
   
    const formattedData = [];
    // Boucle sur les données JSON
    for (const entry of jsonData) {
      
      let axData = [];
      for (const entr of entry.regions) {
        axData.push({ y: entr.percentage, label: entr.region })
      }
      
      const formattedEntry = {
        type: 'stackedColumn100',
        name: entry.candidat,
      
        indexLabelFontColor: 'white',
        dataPoints: axData
      };
      formattedData.push(formattedEntry);
    }
    return formattedData;
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '3px solid #' + ('000000' + color).slice(-6);
  }


  getRecup(){

      forkJoin([this.httpService.getResultat(),this.httpService.getResultatDiaspoora()]).subscribe(
        (resultat : any []) =>{

         
            let recupResultat : any [] = [];
            this.nbrVotant = parseInt(resultat[0].nbrVotant)+ parseInt(resultat[1].nbrVotant);
          
            
            resultat[0].rtsParCandidats.forEach((el1:any) => {
                let recup = resultat[1].rtsParCandidats.find((x:any)=>x.nom == el1.nom);
                
                 
                 el1.nb  =  parseInt(el1.nb) + parseInt(recup.nb);
                 
                 recupResultat.push(el1);
                

            });
         
            this.allResultatsByCandidats = recupResultat.sort((a,b) => b.nb - a.nb);
        },(error)=>{
        }
      )
   
      // this.httpService.getResultat().subscribe((rs:any)=>{
      //   this.httpService.getResultatDiaspoora().subscribe((rs:any)=>{
         
      //   this.allResultatsByCandidats = rs.rtsParCandidats;

        
      //   this.allResultatsByCandidats = this.allResultatsByCandidats.sort((a,b) => b.nb - a.nb);
       
      //   this.nbrVotant = rs.nbrVotant;    

      //    });
    
  }
  getDashBoard(){
    this.httpService.getDashboard().subscribe((rs:any) =>{
        this.dashboardData = rs;
        console.log(this.dashboardData);
        
        
        
    })
 }


 sommeDeuxInt(nb1 : any , nb2 :any){
       return parseInt(nb1) + parseInt(nb2);
 }


}
