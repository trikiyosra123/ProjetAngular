import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonneService } from '../services/personne.service';
import { DepartementService } from '../services/departement.service';
import { RegionService } from '../services/region.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-personne',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {
  // 📌 SERVICES
  // ============================================================
  employeeService = inject(PersonneService);
  departmentService = inject(DepartementService);
  cdRef = inject(ChangeDetectorRef);

  personnes: any[] = [];
  departements: any[] = [];
    filteredPersonnes: any[] = [];
  allDepartements: any[] = [];
  regions: any[] = [];
  newPersonne = { 
    nom: '',
    prenom: '',
    departementId: 0
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
   selectedRegionId: number | null = null;
  selectedDepartementId: number | null = null;
  editingPersonneId: number | null = null;

    isModalOpen: boolean = false;

  constructor(
    private personneService: PersonneService,
    private departementService: DepartementService,
    private regionService: RegionService

  ){}

 ngOnInit() {
    // Charger les régions et départements en premier, puis les employés
    forkJoin({
      regions: this.regionService.getAll(),
      departements: this.departmentService.getAll()
    }).subscribe({
      next: (result) => {
        this.regions = result.regions;
        this.departements = result.departements;
        this.allDepartements = [...result.departements];
          // Maintenant charger les employés
        this.loadPersonnes();
      },
      error: (err) => {
        console.error('Erreur chargement données:', err);
        this.showNotification('Erreur lors du chargement des données', 'error');
      }
    });
  }

 // 🆕 OUVRIR LA MODALE
  openModal() {
    this.isModalOpen = true;
  }

  // 🆕 FERMER LA MODALE
  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  // 🆕 ÉDITER DANS LA MODALE
  editPersonneInModal(personne: any) {
    this.newPersonne = {
      nom: personne.nom,
      prenom: personne.prenom,
      departementId: personne.departement?.id || 0
    };
    this.editingPersonneId = personne.id;
    this.openModal();
  }
  
   // 📌 NOTIFICATIONS
  // ============================================================
  showNotification(message: string, type: 'success' | 'error' | 'info') {
    console.log('🔔 Notification appelée:', message, type); 
    this.notification = { show: true, message, type };
    console.log('📊 État notification:', this.notification); 
    
    // Auto-fermeture après 3 secondes
    setTimeout(() => {
      this.notification.show = false;
      console.log('❌ Notification fermée'); 
    }, 3000);
  }

  loadDepartements() {
    this.departementService.getAll().subscribe({
      next: (data) => {
        this.departements = data;
        console.log("Départements chargés:", this.departements);
        this.loadPersonnes();
      },
      error: (err) => console.error('Erreur chargement départements:', err)
    });
  }

  loadPersonnes() {
    this.personneService.getAllPersonnes().subscribe({
      next: (data) => {
        console.log("Données brutes API:", data);
         this.personnes = data;
        this.cdRef.detectChanges();
        this.applyFilters();
      },
        error: (err) => {
        console.error('Erreur lors de la récupération des employés:', err);
        this.showNotification('Erreur lors du chargement des employés', 'error');
          }
         });
  }
applyFilters() {
    this.filteredPersonnes = this.personnes.filter(personne => {
      let match = true;
// Vérifier région
      if (this.selectedRegionId !== null) {
        match = match && personne.departement?.region != null &&
         personne.departement.region.id == this.selectedRegionId;
      }
      
  // Vérifier département

      if (this.selectedDepartementId !== null) {
        match = match && personne.departement?.id == this.selectedDepartementId;
      }

      return match;
    });
     console.log('Filtres appliqués:', {
    regionId: this.selectedRegionId,
    departementId: this.selectedDepartementId,
    personnes: this.personnes.length,
    resultats: this.filteredPersonnes.length
  });
  }

  onRegionChange() {
    this.selectedDepartementId = null;
  
  if (this.selectedRegionId !== null) {
    // Filtrer les départements qui appartiennent à la région sélectionnée
    this.departements = this.allDepartements.filter(
      dept => dept.region?.id === Number(this.selectedRegionId)
    );
  }
  else {
    // Si aucune région n'est sélectionnée, afficher tous les départements
    this.departements = [...this.allDepartements];
  }
// Appliquer les filtres
  this.applyFilters();
}

addPersonne() {
    if (!this.newPersonne.nom || !this.newPersonne.prenom || !this.newPersonne.departementId) {
      this.showNotification('Tous les champs sont obligatoires', 'error');
      return;
    }

    const dataToSend = {
      nom: this.newPersonne.nom,
      prenom: this.newPersonne.prenom,
      departement: { id: this.newPersonne.departementId }
    };

    if (this.editingPersonneId) {
      this.personneService.update(this.editingPersonneId, dataToSend).subscribe({
        next: () => {
          this.showNotification('Personne modifiée avec succès !', 'success');
          this.resetForm();
          this.loadPersonnes();
        },
        error: () => this.showNotification('Erreur modification personne', 'error')
      });
    } else {
      this.personneService.create(dataToSend).subscribe({
        next: () => {
          this.showNotification('Personne ajoutée avec succès !', 'success');
          this.resetForm();
          this.loadPersonnes();
        },
        error: () => this.showNotification('Erreur ajout personne', 'error')
      });
    }
  }
  resetForm() {
    this.newPersonne = { nom: '', prenom: '', departementId: 0 };
    this.editingPersonneId = null;
  }

    editPersonne(personne: any) {
    this.newPersonne = {
      nom: personne.nom,
      prenom: personne.prenom,
      departementId: personne.departement?.id || personne.departementId
    };
    this.editingPersonneId = personne.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


 resetFilters() {
    this.selectedRegionId = null;
    this.selectedDepartementId = null;
    this.departements = [...this.allDepartements];
    this.applyFilters();
  }
   deletePersonne(id: number) {
    if (!confirm("Voulez-vous vraiment supprimer cette personne ?")) return;

    this.personneService.delete(id).subscribe({
      next: () => {
        this.personnes = this.personnes.filter(p => p.id !== id);
        this.applyFilters();
        this.showNotification('Personne supprimée', 'success');
      },
      error: () => this.showNotification('Erreur suppression personne', 'error')
    });
  }

  getInitials(nom: string, prenom: string): string {
    if (!nom || !prenom) return '??';
    const firstInitial = prenom.charAt(0).toUpperCase();
    const lastInitial = nom.charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }

  
  
  
}