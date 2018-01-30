import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from '../core/models';

@Injectable()
export class BooksService {

  constructor(private http: HttpClient) {}

  getBooks(title: string): Observable<Book[]> {
    const params = new HttpParams({ encoder: new WebHttpUrlEncodingCodec() })
      .set('q', `title:${title}&maxResults:10`);
    return this.http.get<Book[]>('https://www.googleapis.com/books/v1/volumes', { params })
      .map(books => {
        return books['items'].map(book => new Book(book));
      });
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`https://www.googleapis.com/books/v1/volumes/${id}`);
  }
}

export class WebHttpUrlEncodingCodec {
  encodeKey(k: string): string { return standardEncoding(k); }

  encodeValue(v: string): string { return standardEncoding(v); }

  decodeKey(k: string): string { return decodeURIComponent(k); }

  decodeValue(v: string) { return decodeURIComponent(v); }
}

function standardEncoding(v: string): string {
  return encodeURIComponent(v)
      // .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%26/gi, '&');
      // .replace(/%2C/gi, ',')
      // .replace(/%3B/gi, ';')
      // .replace(/%2B/gi, '+')
      // .replace(/%3D/gi, '=')
      // .replace(/%3F/gi, '?')
      // .replace(/%2F/gi, '/');
}
