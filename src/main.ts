// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
import { appConfig } from './app/config/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// platformBrowserDynamic().bootstrapModule(AppModule, appConfig as any)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));