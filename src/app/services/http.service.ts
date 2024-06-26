import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url : string = "https://election.jafrchir.org/api";
  // url : string = "http://127.0.0.1:8000/api";

  constructor(private httpClient : HttpClient) { }



  // recuperer les resultats

   getResultat(){
    return this.httpClient.get(this.url+"/resultatsParCandidats")
  }

  getResultatDiaspoora(){
    return this.httpClient.get(this.url+"/resultatsParCandidatsFromDiapora")
  }

  getResultatRegion(){
    return this.httpClient.get(this.url+"/resultatsParCandidatsRegion")
  }
  getResultatByRegionId(id:number){
    return this.httpClient.get(this.url+"/resultatsParCandidatsByRegionId/"+id)
  }

  getResultatByRegionIdAndCandidatId(id:number){
    return this.httpClient.get(this.url+"/resultatsParCandidats/"+id)
  }

  getDataFromDiagram(){
    
    return this.httpClient.get(this.url+"/rts/groupby/candidat/and/region")
  }

  getCandidatsList(){
  
    
      return this.httpClient.get(this.url+"/all/candidats")
  
  
  }

  getDataRegionCandidat(id:number){
    
    return this.httpClient.get(this.url+"/rts/region/candidat/"+id)
  }


  getDashboard(){
    return this.httpClient.get(this.url+"/data/home")
  }
}
