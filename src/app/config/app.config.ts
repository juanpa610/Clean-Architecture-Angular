import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';

import { AlbumService } from '../infraestructure/driven-adapters/album/album.service';
import { routes } from '../ui/app-routing.module';
import { AlbumGateway } from '../domain/gateways/album.gateway';
import { AuthInterceptor } from '../infraestructure/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        {
            provide: AlbumGateway,
            useClass: AlbumService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
};

//* Esto le dice a Angular, "cuando alguien pida un AlbumGateway, dale un AlbumService

//!
//* Cuando se solicite una instancia de AlbumGateway en cualquier parte de la aplicacion, 
//* se inyectara una instancia de AlbumService.

//!
//* Esto se logra gracias a la inyeccion de dependencias de angular, cuando se solicita una 
//* instancia de AlbumGateway en el constructor de AlbumUseCases, Angular se encarga de resolver
//* esta dependencia y proporcionar una instancia de AlbumService.