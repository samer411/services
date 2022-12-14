import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

import { Book } from '../models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: [],
})
export class AddBookComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    console.log(newBook);
    this.dataService.addBook(newBook).subscribe({
      next: (data: Book) => console.log(data),
      error: (err: Error) => console.log(err),
    });
  }
}
