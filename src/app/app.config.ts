import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-402f2","appId":"1:21312350780:web:0edaefe86a73e61bc27139","storageBucket":"ring-of-fire-402f2.firebasestorage.app","apiKey":"AIzaSyB1VEM4uhxcFqi19lO3f9O812VHXwZ9l5Y","authDomain":"ring-of-fire-402f2.firebaseapp.com","messagingSenderId":"21312350780"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
