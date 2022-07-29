import { Component, OnInit, Version, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';
import { BookTrackerError } from '../models/bookTrackerError';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService,
    private title: Title
  ) {
    this.loggerService.log('creating the dashboard.');
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    this.dataService.getAllReaders().subscribe({
      next: (data: Reader[]) => (this.allReaders = data),
      error: (err: BookTrackerError) => console.log(err.friendlyMessage),
      complete: () => this.loggerService.log(`All Done Getting Readers!`),
    });
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.getAuthorRecommendationAsync(1);

    this.title.setTitle(`Book Tracker ${VERSION}`);

    this.loggerService.log(`Done With Dashboard Initialization`);

    throw new Error('Ugly technical error!');
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    let author: string = await this.dataService.getAuthorRecommendation(
      readerID
    );
    this.loggerService.log(author);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
