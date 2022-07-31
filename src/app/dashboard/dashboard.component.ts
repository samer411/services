import { Component, OnInit, Version, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';
import { BookTrackerError } from '../models/bookTrackerError';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

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
    private title: Title,
    private route: ActivatedRoute
  ) {
    // this.loggerService.log('creating the dashboard.');
  }

  ngOnInit() {
    let resolvedData: Book[] | BookTrackerError =
      this.route.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard Component Error: ${resolvedData.friendlyMessage}`);
    } else {
      this.allBooks = resolvedData;
    }
    this.dataService.getAllReaders().subscribe({
      next: (data: Reader[]) => (this.allReaders = data),
      error: (err: any) => console.error(err),
      complete: () => console.log('All done Getting Boooks'),
    });

    this.mostPopularBook = this.dataService.mostPopularBook;

    this.getAuthorRecommendationAsync(1);

    this.title.setTitle(`Book Tracker ${VERSION}`);

    // this.loggerService.log(`Done With Dashboard Initialization`);
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    let author: string = await this.dataService.getAuthorRecommendation(
      readerID
    );
    // this.loggerService.log(author);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe({
      next: (data: void) => {
        let index: number = this.allBooks.findIndex(
          (book) => book.bookID === bookID
        );
        this.allBooks.splice(index, 1);
      },
      error: (err: Error) => console.log(err),
    });
  }

  deleteReader(readerID: number): void {
    this.dataService.deleteReader(readerID).subscribe({
      next: (data: void) => {
        let index: number = this.allReaders.findIndex((reader) => {
          reader.readerID;
        });
        this.allReaders.splice(index, 1);
      },
      error: (err: Error) => {
        console.error(err);
      },
    });
  }
}
