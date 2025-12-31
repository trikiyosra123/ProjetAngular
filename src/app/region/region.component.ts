import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegionService } from '../services/region.service';
import { Departement, Region } from '../models/models';
import { ReportService } from '../services/report.Service';
import { DepartementService } from '../services/departement.service';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
    departements: Departement[] = [];
  newRegion: Region = {
    id: 0,
    nom: ''
  };
  notification: { 
    show: boolean; 
    message: string; 
    type: 'success' | 'error' | 'info' 
  } = {
    show: false,
    message: '',
    type: 'success'
  };
     
  editingRegionId: number | null = null;
  isLoading: boolean = false;
 selectedRegionId: number | null = null;
  constructor(private regionService: RegionService,
          private reportService: ReportService,
              private departementService: DepartementService


  ) {}

  ngOnInit(): void {
    this.loadRegions();
  }
downloadReport(): void {
  
  this.reportService. downloadRegions().subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_regions.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Erreur téléchargement PDF:', err);
      this.showNotification('Erreur lors du téléchargement du PDF', 'error');
    }
  });
}
  loadRegions(): void {
    this.isLoading = true;
    this.regionService.getAll().subscribe({
      next: (data) => {
        this.regions = data;
        this.isLoading = false;
      },
      error: () => {
        alert('Erreur lors du chargement des régions');
        this.isLoading = false;
      }
    });
  }
  //  NOTIFICATIONS
  // ============================================================
  showNotification(message: string, type: 'success' | 'error' | 'info') {
    this.notification = { show: true, message, type };
   
    
   
  }

selectRegion(region: Region): void {
    if (this.selectedRegionId === region.id) {
      // Déselectionner si déjà sélectionnée
      this.selectedRegionId = null;
      this.departements = [];
    } else {
      this.selectedRegionId = region.id!;
      // Charger les départements pour cette région
      this.departementService.getByRegion(region.id!).subscribe({
        next: (data) => {
          this.departements = data;
        },
        error: () => {
          alert('Erreur lors du chargement des départements');
        }
      });
    }
  }
  addRegion(): void {
    if (!this.newRegion.nom || this.newRegion.nom.trim() === '') {
      this.showNotification('Veuillez remplir le nom de la région', 'error');
      return;
    }

    // Déplacer la déclaration const ICI, dans la méthode
    const dataToSend = {
      nom: this.newRegion.nom.trim(),
    };
    
    if (this.editingRegionId) {
      // MODIFICATION
      this.regionService.update(this.editingRegionId, dataToSend).subscribe({
        next: () => {
          this.showNotification('Région modifiée avec succès !', 'success');
          this.loadRegions();
          this.resetForm();
        },
        error: () => 
          this.showNotification('Erreur modification région', 'error')
        });
       
    } else {
      // AJOUT
      this.regionService.create(dataToSend).subscribe({
        next: () => {
          this.showNotification('Région ajoutée avec succès !', 'success');
          this.loadRegions();
          this.resetForm();
        },
        error: () => {
          this.showNotification('Erreur ajout région', 'error');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }


  editRegion(region: Region): void {
    this.newRegion = { 
      id: region.id,
      nom: region.nom 
    };
        this.editingRegionId = region.id!;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.newRegion = {
      id: 0,
      nom: ''
    };
    this.editingRegionId = null;
  }
deleteRegion(id: number): void {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette région ?')) return;

  this.regionService.delete(id).subscribe({
    next: () => {
      this.showNotification('Région supprimée avec succès !', 'success');

            // Mettre à jour la liste localement sans recharger depuis le serveur
            this.loadRegions();

      
      if (this.editingRegionId === id) {
        this.resetForm();
      }
    },
    error: () => {
      this.showNotification('Erreur lors de la suppression', 'error');
    }
  });
}
}