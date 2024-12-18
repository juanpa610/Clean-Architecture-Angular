import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AlbumGateway } from '../../../domain/gateways/album.gateway';
import { Album } from '../../../domain/models/Album/album.model';
import { ApiResponse } from '../../../domain/interfaces/response.interface';



@Injectable({
    providedIn: 'root'
})

export class AlbumUseCases {
    constructor(private _albumGateWay: AlbumGateway) { }

    getAlbumById(id: number): Observable<ApiResponse<Album>> {
        return this._albumGateWay.getByID(id).pipe(
            map(album => ({
                data: album,
                status: 200,
                message: 'Album retrieved successfully',
                metadata: {
                    timestamp: new Date(),
                    path: `/albums/${id}`
                }
            }))
        );
    }
    getAllAlbum(): Observable<ApiResponse<Album[]>> {
        return this._albumGateWay.getAll().pipe(
            map(album => ({
                data: album,
                status: 200,
                message: 'Album retrieved successfully',
                metadata: {
                    timestamp: new Date(),
                    path: ''
                }
            }))
        );
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