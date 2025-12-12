import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {
    console.log('AuthService initialized');
  }

  async login(): Promise<void> {
    try {
      console.log('Starting login process...');
      await this.keycloak.login({
        redirectUri: window.location.origin + window.location.pathname
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      console.log('Starting logout process...');
      await this.keycloak.logout(window.location.origin);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const authenticated = await this.keycloak.isLoggedIn();
      console.log('Is authenticated:', authenticated);
      return authenticated;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  userProfile() {
    const profile = this.keycloak.getKeycloakInstance()?.tokenParsed;
    console.log('User profile from token:', profile);
    return profile;
  }

  async refreshProfile() {
    try {
      const profile = await this.keycloak.loadUserProfile();
      console.log('Loaded user profile:', profile);
      return profile;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  getUserRoles(): string[] {
    const token = this.keycloak.getKeycloakInstance()?.tokenParsed as any;

    if (!token) {
      console.warn('No token available');
      return [];
    }

    // Récupérer les rôles du realm
    const realmRoles = token.realm_access?.roles || [];

    // Récupérer les rôles du client
    const clientRoles = token.resource_access?.['application1']?.roles || [];

    // Combiner tous les rôles
    const allRoles = [...realmRoles, ...clientRoles];
    console.log('User roles:', allRoles);
    return allRoles;
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return roles.some(role => userRoles.includes(role));
  }

  // Méthode utile pour déboguer
  getKeycloakInfo() {
    const instance = this.keycloak.getKeycloakInstance();
    return {
      authenticated: instance?.authenticated,
      token: instance?.token ? 'Present' : 'Missing',
      refreshToken: instance?.refreshToken ? 'Present' : 'Missing',
      realm: instance?.realm,
      clientId: instance?.clientId
    };
  }
}