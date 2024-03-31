import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-diaspra',
  templateUrl: './diaspra.component.html',
  styleUrls: ['./diaspra.component.css']
})
export class DiaspraComponent {
  allResultatsByCandidats : any [] = [];
  nbrVotant : number = 0;
  dashboardData:any = {};
  constructor(private httpService : HttpService){
    this.getRecup();
    this.getDashBoard();
    setInterval(()=>{
      this.getRecup();
  },200000);
   
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '3px solid #' + ('000000' + color).slice(-6);
  }

  getRecup(){
    this.httpService.getResultatDiaspoora().subscribe((rs:any)=>{
        
         
      this.allResultatsByCandidats = rs.rtsParCandidats;
      this.allResultatsByCandidats = this.allResultatsByCandidats.sort((a,b) => b.nb - a.nb);
      this.nbrVotant = rs.nbrVotant;     
});

  }

  getDashBoard(){
    this.httpService.getDashboard().subscribe((rs:any) =>{
        this.dashboardData = rs;
      
    })
 }

 pourcentage(nb1:any,nb2:any){
   return ((nb1 / nb2) * 100).toFixed(2);
 }

}
