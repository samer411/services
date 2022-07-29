import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { allBooks, allReaders } from '../data';
import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { LoggerService } from './logger.service';
import { BookTrackerError } from '../models/bookTrackerError';

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
  private handelError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = `An Error Occured Retriving Data`;
    return throwError(dataError);
  }
  getReaderById(id: number): Reader {
    return allReaders.find((reader) => reader.readerID === id);
  }
  getAllBooks(): Book[] {
    return allBooks;
  }
  getBookById(id: number): Book {
    return allBooks.find((book) => book.bookID === id);
  }
  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
}
