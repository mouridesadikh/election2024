import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent {
  allCandidats : any [] = [];
  constructor(private httpService : HttpService){
    this.getCandidat();   console.log('====================================');
    console.log(this.allCandidats);
    console.log('====================================');
  }

  getInformationByCandidat(candidat:any){
  
  }
 
  ngOnInit(): void {
    this.getCandidat();
    
  }
  
  getCandidat(){
    this.httpService.getCandidatsList()
    .pipe(
        map((rs: any) => {
          return rs;
        })
    )
    .subscribe((res:any)=>{
      this.allCandidats = res;
  
    });
    
  
  }
}
