//* Gateway define  las funciones que se deben ejecutar relacionadas al dominio.
//* Es como un contrato, donde descimos que queremos hacer pero no el como

import { Observable } from 'rxjs';
import { Album } from '../album.model';


export abstract class AlbumGateway {
    abstract getByID(id: String): Observable<Album>;
    abstract getAll(): Observable<Array<Album>>;
    abstract saveNew (_alb :Album) : Observable<void>;
}