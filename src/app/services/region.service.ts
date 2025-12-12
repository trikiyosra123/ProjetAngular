import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/models'; // ← Import depuis models

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:8081/api/regions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/getRegions`);
  }

  getById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.apiUrl}/${id}`);
  }

  create(region: Region): Observable<Region> {
    return this.http.post<Region>(`${this.apiUrl}/ajouterRegion`, region);
  }

  update(id: number, region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.apiUrl}/modifierRegion/${id}`, region);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimerRegion/${id}`);
  }
}