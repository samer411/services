import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, map, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { allBooks, allReaders } from '../data';
import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { LoggerService } from './logger.service';
import { BookTrackerError } from '../models/bookTrackerError';
import { OldBook } from '../models/oldBook';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  getAuthorRecommendation(readerID: Number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerID > 0) {
          resolve('Dr. Seuss');
        } else {
          reject('Invalid Reader Id');
        }
      }, 2000);
    });
  }

  constructor(private loggerService: LoggerService, private http: HttpClient) {}

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http
      .get<Reader[]>('/api/readers')
      .pipe(catchError(this.handelError));
  }
  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`api/readers/${id}`);
  }
  // ******** Readers ***********

  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>('api/readers', newReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  updateReader(updatedReaer: Reader): Observable<void> {
    return this.http.put<void>(`api/readers/${updatedReaer}`, updatedReaer, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  deleteReader(id: number): Observable<void> {
    return this.http.delete<void>(`api/readers/${id}`);
  }

  private handelError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = `An Error Occured Retriving Data`;
    return throwError(() => console.error(dataError));
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http
      .get<Book[]>('/api/books')
      .pipe(catchError((err) => this.handelError(err)));
  }
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Autherization: 'my-token',
      }),
    });
  }
  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`api/books/${id}`).pipe(
      map(
        (b) =>
          <OldBook>{
            bookTitle: b.title,
            year: b.publicationYear,
          }
      ),
      tap((classicBook) => console.log(classicBook))
    );
  }
  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(
      `/api/books/${updatedBook.bookID}`,
      updatedBook,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`api/books/${id}`);
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
}
