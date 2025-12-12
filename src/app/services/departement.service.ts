import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../models/models'; // ← Import depuis models

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'http://localhost:8081/api/departements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiUrl}/getDepartements`);
  }

  create(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.apiUrl}/ajouterDepartement`, departement);
  }

  update(id: number, departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.apiUrl}/modifierDepartement/${id}`, departement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimerDepartement/${id}`);
  }
}