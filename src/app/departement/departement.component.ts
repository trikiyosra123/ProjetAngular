import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartementService } from '../services/departement.service';
import { RegionService } from '../services/region.service';
import { Departement, Region } from '../models/models';
import { forkJoin } from 'rxjs';
import { ReportService } from '../services/report.Service';

@Component({
  selector: 'app-departement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  isModalOpen = false;
  departements: Departement[] = [];
  allRegions: any[] = [];
  regions: Region[] = [];
  newDept: any = {
    nom: '',
    description: '',
    regionId: 0
  };
  selectedDeptId: number | null = null;
selectedDeptPersonCount: number | null = null;
filteredDepartements: Departement[] = [];
selectedRegionId: number | null = null;
  allDepartements: Departement[] = [];

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
    private regionService: RegionService,    
          private reportService: ReportService

  ) {}
  
  openModal() {
  this.isModalOpen = true;
  this.editingDeptId = null; // Pas en mode édition
  this.newDept = { nom: '', description: '', regionId: 0 }; // reset formulaire
}

// Fermer le modal
closeModal() {
  this.isModalOpen = false;
}

  ngOnInit(): void {
    // Charger régions et départements en parallèle
    forkJoin({
      regions: this.regionService.getAll(),
      departements: this.departementService.getAll()
    }).subscribe({
      next: ({ regions, departements }) => {
        this.regions = regions;
        this.departements = departements;
        this.allDepartements = [...departements];
        this.filteredDepartements = [...departements];
      },
      error: (err) => {
        console.error('Erreur chargement données:', err);
        this.showNotification('Erreur lors du chargement des données', 'error');
      }
    });
  }

  loadRegions(): void {
    this.departementService.getAll().subscribe({
      next: (data) => {
        this.regions = data;
      },
      error: (err) => console.error('Erreur chargement régions:', err)
    });
  }

  loadDepartements(): void {
    this.departementService.getAll().subscribe(depts => {
      this.departements = depts;
      this.allDepartements = [...depts];
      this.applyFilters();
    });
  }
  // Méthode pour filtrer les départements

applyFilters(): void {
  if (this.selectedRegionId) {
    // Filtrer seulement les départements dont la région correspond
    this.filteredDepartements = this.departements.filter(d => 
      d.region?.id === this.selectedRegionId
    );
  } else {
    // Si aucune région sélectionnée, afficher tous
    this.filteredDepartements = [...this.departements];
  } 
}

resetFilters(): void {
  this.selectedRegionId = null;
  this.filteredDepartements = [...this.allDepartements];
}

onRegionChange(): void {
  this.applyFilters();
}

// Gardez cette version - elle accepte un nombre
toggleDetails(deptId: number) {
  if (this.selectedDeptId === deptId) {
    this.selectedDeptId = null;
    this.selectedDeptPersonCount = null;
  } else {
    this.selectedDeptId = deptId;
    this.selectedDeptPersonCount = null;

    this.departementService.countPersonnes(deptId).subscribe({
      next: (count) => {
        this.selectedDeptPersonCount = count;
      },
      error: (err) => console.error('Erreur compter personnes:', err)
    });
  }
}

closeAllCards() {
  this.selectedDeptId = null;
  this.selectedDeptPersonCount = null;
}
  addDepartement(): void {
    if (!this.newDept.nom || !this.newDept.regionId ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Trouver la région complète
    
  const selectedRegion = this.regions.find(r => r.id === +this.newDept.regionId);

if (!selectedRegion) {
  alert('Région invalide');
  return;
}
  this.closeModal();

const dataToSend: Departement = {
  //On récupère le nom et description du nouveau département depuis un objet newDept.
  nom: this.newDept.nom,
  description: this.newDept.description,
  region: selectedRegion // objet contient id et nom
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
            this.closeModal();

        },
        error: (err) => console.error('Erreur ajout departement', err)
      });
    }
  }
showNotification(message: string, type: 'success' | 'error' | 'info') {
    
    this.notification = { show: true, message, type };
    
    
  }
  editDepartement(dept: Departement): void {
      this.isModalOpen = true;
    this.editingDeptId = dept.id!;
    this.newDept = {
      nom: dept.nom,
      description: dept.description,
      regionId: dept.region?.id || 0
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
downloadReport(): void {
  console.log('Téléchargement du rapport lancé...');
 this.reportService.downloadDepartements(this.selectedRegionId ?? undefined).subscribe({
  next: (blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'departements.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    this.showNotification('Rapport téléchargé avec succès', 'success');
  },
  error: (error: any) => {
    console.error('Erreur téléchargement PDF', error);
    this.showNotification('Erreur lors du téléchargement du rapport', 'error');
  }
});

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



confirmDelete(dept: Departement) {
  if (dept.id == null) return; // ignore si id non défini

  this.departementService.hasLiaisons(dept.id).subscribe((result: boolean) => {
    if(result) {
      if(confirm('⚠ Cela supprimera aussi toutes les personnes et la liaison avec la région !')) {
        this.deleteDepartement(dept.id!);
      }
    } else {
      if(confirm('Voulez-vous vraiment supprimer ce département ?')) {
        this.deleteDepartement(dept.id!);
      }
    }
  });
}

deleteDepartement(id: number) {
  this.departementService.delete(id).subscribe(() => {
    alert('Département supprimé !');
    this.loadDepartements();
  });
}

}