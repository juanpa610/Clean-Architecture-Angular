//? Gateway (Interfaz/Contrato)

//* Gateway define  las funciones que se deben ejecutar relacionadas al dominio.
//* Es como un contrato, donde descimos que queremos hacer pero no el como 
//* Es similar a una interfaz que define los metodos que necesitamos.

import { Observable } from 'rxjs';
import { Album } from '../models/Album/album.model';


export abstract class AlbumGateway {
    abstract getByID(id: number): Observable<Album>;
    abstract getAll(): Observable<Array<Album>>;
    abstract saveNew (_alb :Album) : Observable<void>;
}