import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartementService } from '../services/departement.service';
import { RegionService } from '../services/region.service';
import { Departement, Region } from '../models/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-departement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  departements: Departement[] = [];
    allRegions: any[] = [];
regions: Region[] = [];

  newDept: any = {
    nom: '',
    description: '',
    regionId: 0
  };
  
  editingDeptId: number | null = null;

  notification: { 
    show: boolean; 
    message: string; 
    type: 'success' | 'error' | 'info' 
  } = {
    show: false,
    message: '',
    type: 'success'
  };
  constructor(
    private departementService: DepartementService,
    private regionService: RegionService
  ) {}

  ngOnInit() {
    // Charger les régions et départements en premier, puis les employés
    forkJoin({
      regions: this.regionService.getAll(),
    }).subscribe({
      next: (result) => {
        this.regions = result.regions;
        this.allRegions = [...result.regions];
        
        // Maintenant charger les employés
        this.loadDepartements();
      },
      error: (err) => {
        console.error('Erreur chargement données:', err);
        this.showNotification('Erreur lors du chargement des données', 'error');
      }
    });
  }

  loadRegions(): void {
    this.regionService.getAll().subscribe({
      next: (data) => {
        this.regions = data;
      },
      error: (err) => console.error('Erreur chargement régions:', err)
    });
  }

  loadDepartements(): void {
    this.departementService.getAll().subscribe({
      next: (data) => {
        this.departements = data;
      },
      error: (err) => console.error('Erreur chargement départements:', err)
    });
  }

  addDepartement(): void {
    if (!this.newDept.nom || !this.newDept.regionId || this.newDept.regionId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Trouver la région complète
    
  const selectedRegion = this.regions.find(r => r.id === this.newDept.regionId);

if (!selectedRegion) {
  alert('Région invalide');
  return;
}

const dataToSend: Departement = {
  nom: this.newDept.nom,
  description: this.newDept.description,
  region: selectedRegion // contient id et nom
};


    if (this.editingDeptId) {
      // Mode modification
      this.departementService.update(this.editingDeptId, dataToSend).subscribe({
        next: () => {
          alert('Département modifié avec succès !');
         this.resetForm();
          this.loadDepartements();
          
        },
        error: (err) => console.error('Erreur modification:', err)
      });
    } else {
      // Mode ajout
      this.departementService.create(dataToSend).subscribe({
        next: () => {
         this.showNotification('Département ajouté avec succès !', 'success');
          this.loadDepartements();
          this.resetForm();
        },
        error: (err) => console.error('Erreur ajout departement', err)
      });
    }
  }
showNotification(message: string, type: 'success' | 'error' | 'info') {
    console.log('🔔 Notification appelée:', message, type); 
    this.notification = { show: true, message, type };
    console.log('📊 État notification:', this.notification); 
    
  }
  editDepartement(dept: Departement): void {
    this.editingDeptId = dept.id!;
    this.newDept = {
      nom: dept.nom,
      description: dept.description,
      regionId: dept.region?.id || 0
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.newDept = {
      nom: '',
      description: '',
      regionId: 0
    };
    this.editingDeptId = null;
  }

  deleteDepartement(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) return;

    this.departementService.delete(id).subscribe({
      next: () => {
        alert('Département supprimé avec succès !');
        this.loadDepartements();
        if (this.editingDeptId === id) {
          this.resetForm();
        }
      },
      error: (err) => console.error('Erreur suppression:', err)
    });
  }
}