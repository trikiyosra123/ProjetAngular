import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <header class="header">
      <nav class="nav">
        <!-- Logo -->
        <div class="logo">
          <div class="logo-circle">ME</div>
        </div>

        <!-- Menu -->
        <ul class="menu">
          <li><a routerLink="/" title="Accueil"><span class="icon">🏠</span> Accueil</a></li>
          <li><a routerLink="/protected" title="Page protégée"><span class="icon">🔒</span> Protégée</a></li>
          <li><a routerLink="/personnes" title="Personne"><span class="icon">👤</span> Personne</a></li>
          <li><a routerLink="/departements" title="Départements"><span class="icon">🏢</span> Départements</a></li>
          <li><a routerLink="/regions" title="Régions"><span class="icon">🗺️</span> Régions</a></li>
        </ul>

        <!-- Auth Section -->
        <div class="auth">
          <!-- Bouton Connexion -->
          <button *ngIf="!isLoggedIn" class="btn btn-login" (click)="onLogin()">
            <span class="icon">🔑</span> Connexion
          </button>

          <!-- Profil utilisateur + Déconnexion -->
          <div *ngIf="isLoggedIn" class="user-profile">
            <div class="user-avatar">{{ profile?.firstName?.charAt(0) || 'U' }}</div>
            <span class="username">{{ profile?.firstName }} {{ profile?.lastName }}</span>
            <button class="btn btn-logout" (click)="onLogout()">Déconnexion</button>
          </div>
        </div>
      </nav>
    </header>

    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host { display: block; font-family: 'Segoe UI', Roboto, sans-serif; background: #fafbfc; min-height: 100vh; }

    .header { background: #0f1419; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.8rem 2rem; position: sticky; top: 0; z-index: 1000; }
    .nav { display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; }
    .logo { display: flex; align-items: center; }
    .logo-circle { width: 45px; height: 45px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.1rem; transition: transform 0.3s ease; }
    .logo-circle:hover { transform: scale(1.05); }

    .menu { display: flex; gap: 1.5rem; list-style: none; margin: 0; padding: 0; align-items: center; }
    .menu li a { text-decoration: none; color: #94a3b8; font-size: 0.95rem; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; }
    .menu li a:hover { background: rgba(255,255,255,0.1); color: white; }
    .menu li a.active { background: rgba(102,126,234,0.1); color: #667eea; }
    .icon { font-size: 1.2rem; filter: grayscale(1); opacity: 0.8; transition: all 0.3s ease; }
    .menu li a:hover .icon, .menu li a.active .icon { filter: grayscale(0); opacity: 1; }

    .auth { display: flex; align-items: center; gap: 1rem; }
    .user-profile { display: flex; align-items: center; gap: 1rem; }
    .user-avatar { width: 36px; height: 36px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.9rem; }
    .username { font-weight: 500; color: #cbd5e1; font-size: 0.95rem; }

    .btn { padding: 0.5rem 1.2rem; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; }
    .btn-login { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    .btn-login:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(102,126,234,0.3); }
    .btn-logout { background: rgba(220,53,69,0.1); color: #dc3545; }
    .btn-logout:hover { background: rgba(220,53,69,0.2); transform: translateY(-2px); }

    .content { padding: 2rem; max-width: 1400px; margin: 0 auto; }

    @media (max-width: 768px) {
      .header { padding: 0.8rem 1rem; }
      .menu li a span:not(.icon) { display: none; }
      .menu li a { padding: 0.5rem; }
      .username { display: none; }
      .content { padding: 1rem; }
    }
  `]
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn = false;
  profile: any = null;

  async ngOnInit() {
    await this.checkAuthStatus();
  }

  private async checkAuthStatus() {
    this.isLoggedIn = await this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.profile = await this.authService.refreshProfile();
    }
  }

  async onLogin() {
    try {
      await this.authService.login();
      // Après login, mettre à jour l'état et le profil
      await this.checkAuthStatus();
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.isLoggedIn = false;
      this.profile = null;
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }
}
