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

  data : any [] = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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

        
        this.allResultatsByCandidats = this.allResultatsByCandidats.sort((a,b) => b.nb - a.nb);
       
        this.nbrVotant = rs.nbrVotant;    

         });
    
  }
  

}
