import { appConfig } from './app/config/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/ui/app.component';


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));