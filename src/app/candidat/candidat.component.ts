import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-candidat',
  standalone: true,
	imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent {
  allCandidats : any [] = [];
  candidatSlected : any = {};
  chartOptions : any;
  dataChart :any [] = [];
  allResultatByCandidatDep : any [] = [];
  isLoading : number = 0;
  allDataByRgion : any = {};
  constructor(private httpService : HttpService){
    this.getCandidat();
    
  }

  getInformationByCandidat(candidat:any){
    this.candidatSlected = candidat;
    this.isLoading = 1;
    this.getData();
    setTimeout(() => {
      this.getData();
    }, 100);
  }
 
  ngOnInit(): void {
    this.getCandidat();
  }
  
    getCandidat(){
      this.httpService.getCandidatsList().subscribe((res:any)=>{
        this.allCandidats = res;
        console.log('====================================');
        console.log(this.allCandidats);
        console.log('====================================');
    })
  
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }



  getData(){
     
    this.httpService.getDataRegionCandidat(this.candidatSlected.id).subscribe((rs:any)=>{
      let mydata : any = [];

          rs.forEach((rs:any)=>{
            mydata.push( { label: rs.region.replace(/\s/g, ''), y: parseInt(rs.nb)})
          });
           
          console.log('====================================');
          console.log("mydata",mydata);
          console.log('====================================');
          this.chartOptions = {
            title: {
              text: "STATISTIQUES REGIONALES DU CANDIDAT"
            },
            animationEnabled: true,
            axisY: {
              includeZero: true
            },
            data: [{
              type: "column", //change type to bar, line, area, pie, etc
              //indexLabel: "{y}", //Shows y value on all Data Points
              indexLabelFontColor: "#000000",
              dataPoints: mydata
            }]
          };

        
        this.getInfoDepartement(this.candidatSlected.id)
    })
   
  }


  groupDataByRegion(data:any) {
   let  groupedData : any = {}
    data.forEach((item :any)=> {
      if (!groupedData[item.region]) {
        groupedData[item.region] = [];
      }
      groupedData[item.region].push(item);
    });
    
    
    this.allDataByRgion =  groupedData;
  }


  getTotalRegion(data:any){
    let total : number = 0;
    data.forEach((item :any)=> {
      total = total + parseInt(item["nb"]);
    });
    return total;
  }
 
  // calculateRegionTotals(dataRecup:any) {
   
  //  let  regionTotals: { [region: string]: number } = {};
  //  console.log('====================================');
  //  console.log("test",dataRecup);
  //  console.log('====================================');
  //   const data = JSON.parse(dataRecup);
  //   for (const entry of data.departement) {
  //     if (regionTotals.hasOwnProperty(entry.region)) {
  //       regionTotals[entry.region] += parseInt(entry.nb, 10);
  //     } else {
  //       regionTotals[entry.region] = parseInt(entry.nb, 10);
  //     }
  //   }
  //   console.log('====================================');
  //   console.log("test",regionTotals);
  //   console.log('====================================');
  //   this.isLoading = 0;
  // }

  getInfoDepartement(id:number){
    this.httpService.getResultatByRegionIdAndCandidatId(id).subscribe((rs:any)=>{
      this.allResultatByCandidatDep = rs.dep;
      
     
      this.groupDataByRegion(this.allResultatByCandidatDep)
      
       
     });
  }
}
