import { appConfig } from './app/config/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/ui/app.component';

import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));