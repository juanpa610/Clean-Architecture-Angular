import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AlbumGateway } from '../models/Album/gateway/album.gateway';
import { Album } from '../models/Album/album.model';

@Injectable({
    providedIn: 'root'
})

export class AlbumUseCases {
    constructor(private _albumGateWay: AlbumGateway) { }

    getAlbumById(id: String): Observable<Album> {
        return this._albumGateWay.getByID(id);
    }
    getAllAlbum(): Observable<Array<Album>> {
        console.log('2 paso desde el Caso de Uso ');
        return this._albumGateWay.getAll();
    }
}

//!
//? El flujo es asi:

//! 1
//* AlbumUseCases solicita una instancia de AlbumGateway en el constructor.

//! 2
//* Angular resuelve esta dependencia y proporciona una instancia de AlbumService, 
//* que implementa la interfaz AlbumGateway.

//! 3
//* AlbumUseCases utiliza los métodos definidos en la interfaz AlbumGateway para interactuar
//* con los datos de los álbumes, sin importar la implementación concreta.