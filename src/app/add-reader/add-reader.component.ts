import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

import { Reader } from '../models/reader';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: [],
})
export class AddReaderComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  saveReader(formValues: any): void {
    let newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    console.log(newReader);
    this.dataService.addReader(newReader).subscribe({
      next: (data: Reader) => console.log(data),
      error: (err: Error) => console.log(err),
    });
  }
}
