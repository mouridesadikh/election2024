import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allResultatsByCandidats : any [] = [];
  nbrVotant : number = 0;
  constructor(private httpService : HttpService){
   
      
      this.getRecup();
      // setInterval(()=>{
      //     this.getRecup();
      // },1000);
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '1px solid #' + ('000000' + color).slice(-6);
  }


  getRecup(){
   
      this.httpService.getResultat().subscribe((rs:any)=>{
        
         
        this.allResultatsByCandidats = rs.rtsParCandidats;
        console.log(this.allResultatsByCandidats);
        
        this.allResultatsByCandidats = this.allResultatsByCandidats.sort((a,b) => b.nb - a.nb);
        console.log(this.allResultatsByCandidats);
        this.nbrVotant = rs.nbrVotant;    

         });
    
  }
  

}
