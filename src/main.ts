import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@vercel/analytics';
import { isDevMode } from '@angular/core';

bootstrapApplication(App, appConfig)
  .then(() => {
    // Inizializza Vercel Analytics dopo il bootstrap
    inject({ mode: isDevMode() ? 'development' : 'production' });
  })
  .catch((err) => console.error(err));
