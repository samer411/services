import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';
import { OldBook } from '../models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: [],
})
export class EditBookComponent implements OnInit {
  selectedBook: Book;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID).subscribe({
      next: (data: Book) => (this.selectedBook = data),
      error: (err: any) => console.error(err),
    });
    this.dataService.getOldBookById(bookID).subscribe({
      next: (data: OldBook) =>
        console.log(`Old book title : ${data.bookTitle}`),
    });
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
    this.loggerService.log(
      `New Most Popular Book is ${this.selectedBook.title}`
    );
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook).subscribe({
      next: (data: void) =>
        console.log(`${this.selectedBook.title} updated successfully`),
      error: (err: Error) => console.log(err),
    });
  }
}
