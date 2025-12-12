import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = 'http://localhost:8081/api/personnes'; // Changé de 8080 à 8081

  constructor(private http: HttpClient) {}

  // Récupérer toutes les personnes
  getAllPersonnes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getPersonnes`);
  }

  // Ajouter une nouvelle personne
  create(personne: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouterPersonne`, personne);
  }

  // Mettre à jour une personne existante
  update(id: number, personne: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifierPersonne/${id}`, personne);
  }

  // Supprimer une personne
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimerPersonne/${id}`);
  }
}