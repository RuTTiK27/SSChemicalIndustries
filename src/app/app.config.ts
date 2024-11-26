import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        "projectId": "ss-chemical-industries",
        "appId": "1:473122063536:web:b0130a1857fe99a38de775",
        "storageBucket": "ss-chemical-industries.firebasestorage.app",
        "apiKey": "AIzaSyBNkU_yw_tYsSvpHvL7zOJtfjmdNA_E9_o",
        "authDomain": "ss-chemical-industries.firebaseapp.com",
        "messagingSenderId": "473122063536",
        "measurementId": "G-XX09ZES08N"
      })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
