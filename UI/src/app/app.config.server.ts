import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app.config';
import { csrfInterceptor } from './csrfintercepter.service';

const serverConfig: ApplicationConfig = {
  providers: [
    
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
