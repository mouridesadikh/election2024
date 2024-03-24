import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent {

  allResultatByCandidat : any [] = [];
  nomRegion : string = "";
  nomTotalDevotePArRegion : number = 0;

   
  constructor(private httpService : HttpService){
    this.httpService.getResultatRegion().subscribe((rs:any)=>{
            
      this.allResultatByCandidat = JSON.parse(rs);
   
      
    });
  }


  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '1px solid #' + ('000000' + color).slice(-6);
  }
}
