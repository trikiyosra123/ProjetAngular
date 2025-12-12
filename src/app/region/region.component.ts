import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegionService } from '../services/region.service';
import { Region } from '../models/models'; // ← Import depuis models

// ... reste du code
@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
  
  newRegion: Region = {
    nom: ''
  };
  
  editingRegionId: number | null = null;

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions(): void {
    this.regionService.getAll().subscribe({
      next: (data) => {
        this.regions = data;
        console.log('Régions chargées:', this.regions);
      },
      error: (err) => console.error('Erreur chargement régions:', err)
    });
  }

  addRegion(): void {
    if (!this.newRegion.nom) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (this.editingRegionId) {
      this.regionService.update(this.editingRegionId, this.newRegion).subscribe({
        next: () => {
          alert('Région modifiée avec succès !');
          this.loadRegions();
          this.resetForm();
        },
        error: (err) => console.error('Erreur modification région:', err)
      });
    } else {
      this.regionService.create(this.newRegion).subscribe({
        next: () => {
          alert('Région ajoutée avec succès !');
          this.loadRegions();
          this.resetForm();
        },
        error: (err) => console.error('Erreur ajout région:', err)
      });
    }
  }

  editRegion(region: Region): void {
    this.editingRegionId = region.id!;
    this.newRegion = {
      nom: region.nom,
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.newRegion = {
      nom: '',
     
    };
    this.editingRegionId = null;
  }

  deleteRegion(id: number): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette région ?')) return;

    this.regionService.delete(id).subscribe({
      next: () => {
        alert('Région supprimée avec succès !');
        this.loadRegions();
        
        if (this.editingRegionId === id) {
          this.resetForm();
        }
      },
      error: (err) => console.error('Erreur suppression région:', err)
    });
  }

 
}