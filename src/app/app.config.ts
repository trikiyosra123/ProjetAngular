import { environment } from '../environments/environments';
import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { isPlatformBrowser } from '@angular/common';
import { routes } from './app.routes';

export function initializeKeycloak(keycloak: KeycloakService, platformId: Object) {
  return async () => {
    if (isPlatformBrowser(platformId)) {
      try {
        console.log('Initializing Keycloak with config:', {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId
        });

        const initialized = await keycloak.init({
          config: {
            url: environment.keycloak.url,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId
          },
          initOptions: {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            checkLoginIframe: false, // Désactiver si vous avez des problèmes CORS
            pkceMethod: 'S256' // Recommandé pour la sécurité
          },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
          bearerExcludedUrls: ['/assets', '/public']
        });

        console.log('Keycloak initialized successfully:', initialized);
        return initialized;
      } catch (error) {
        console.error('Keycloak initialization error:', error);
        return false;
      }
    }
    console.log('Not in browser, skipping Keycloak init');
    return Promise.resolve(true);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([]) // Les intercepteurs Keycloak sont gérés automatiquement
    ),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, PLATFORM_ID]
    }
  ]
};