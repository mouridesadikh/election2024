import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url : string = "http://election.jafrchir.org/api";

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

  getResultatByRegionIdAndCandidatId(id:number,idcandidat:number){
    return this.httpClient.get(this.url+"/resultatsParCandidats/"+idcandidat+"/"+id)
  }


}
