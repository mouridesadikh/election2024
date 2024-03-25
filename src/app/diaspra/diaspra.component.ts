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
  constructor(private httpService : HttpService){
   
    setInterval(()=>{
      this.getRecup();
  },20000);
   
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

}
