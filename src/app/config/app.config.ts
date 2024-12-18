import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from '../app-routing.module';
import { AlbumGateway } from '../domain/models/Album/gateway/album.gateway';
import { AlbumService } from '../infraestructure/driven-adapters/album/album.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        {
            provide: AlbumGateway,
            useClass: AlbumService
        }
    ]
};

//!
//* Cuando se solicite una instancia de AlbumGateway en cualquier parte de la aplicacion, 
//* se inyectara una instancia de AlbumService.

//!
//* Esto se logra gracias a la inyeccion de dependencias de angular, cuando se solicita una 
//* instancia de AlbumGateway en el constructor de AlbumUseCases, Angular se encarga de resolver
//* esta dependencia y proporcionar una instancia de AlbumService.