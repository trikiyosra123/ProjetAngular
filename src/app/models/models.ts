import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonneService } from '../services/personne.service';
import { DepartementService } from '../services/departement.service';
import { RegionService } from '../services/region.service';


// src/app/models/models.ts
export interface Personne {
  id?: number;
  nom: string;
  prenom: string;
  departement?: Departement | null;
  departementId?: number;
}
export interface Departement {
  id?: number;
  nom: string;
  description?: string;
  region?: Region;
  regionId?: number;
}

export interface Region {
  id?: number;
  nom: string;
  description?: string;
  population?: number;
}


