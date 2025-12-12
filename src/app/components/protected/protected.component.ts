import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="protected-content">
      <h1>Page Protégée</h1>

      @if (userInfo(); as user) {
        <div class="user-details">
          <h2>Informations utilisateur</h2>
          <p><strong>Nom d'utilisateur:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Nom complet:</strong> {{ user.fullName }}</p>
          <p><strong>Prénom:</strong> {{ user.firstName }}</p>
          <p><strong>Nom:</strong> {{ user.lastName }}</p>

         
        </div>
      }
    </div>
  `,
  styles: [`
    .protected-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      color: #1f2937;
      margin-bottom: 2rem;
    }

    .user-details {
      background: #f5f5f5;
      padding: 2rem;
      border-radius: 8px;
      margin-top: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #374151;
      margin-top: 0;
    }

    h3 {
      color: #374151;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      margin: 0.75rem 0;
      color: #4b5563;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      background: #3b82f6;
      color: white;
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      border-radius: 6px;
      font-weight: 500;
      display: inline-block;
      margin-right: 0.5rem;
    }
  `]
})
export class ProtectedComponent {
  authService = inject(AuthService);

  // Computed signal pour obtenir les informations utilisateur de manière type-safe
  userInfo = computed(() => {
    const profile = this.authService.userProfile();
    if (!profile) return null;

    return {
      username: profile['preferred_username'] || 'N/A',
      email: profile['email'] || 'N/A',
      fullName: profile['name'] || 'N/A',
      firstName: profile['given_name'] || 'N/A',
      lastName: profile['family_name'] || 'N/A'
    };
  });
}
