import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl: string = 'http://localhost:8081/api/reports'; 

  constructor(private http: HttpClient) { }

  downloadPdf(regionId?: number, deptId?: number) {
    let params: any = {};
    if (regionId != null) params.regionId = regionId;
    if (deptId != null) params.deptId = deptId;

    return this.http.get(`${this.baseUrl}/personnes`, {
      params: params,
      responseType: 'blob' // Important pour recevoir un PDF
    });
}
 // Rapport Régions
  downloadRegions(regionId?: number) {
    let params: any = {};
    if (regionId != null) params.regionId = regionId;

    return this.http.get(`${this.baseUrl}/regions`, {
      params: params,
      responseType: 'blob'
    });
  }
  // Rapport Départements
  downloadDepartements(regionId?: number) {
    let params: any = {};
    if (regionId != null) params.regionId = regionId;
    
    return this.http.get(`${this.baseUrl}/departements`, {
      params: params,
      responseType: 'blob'
    });
  }

downloadAttestations(personneId: number[]) {
  let params = new HttpParams();
  personneId.forEach(id => {
    params = params.append('personneId', id.toString());
  });

  return this.http.get(`${this.baseUrl}/attestation`, {
    params: params,
    responseType: 'blob'
  });
}

}
