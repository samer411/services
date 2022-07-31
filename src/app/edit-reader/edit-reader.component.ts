import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from '../models/reader';
import { BadgeService } from '../services/badge.service';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService],
})
export class EditReaderComponent implements OnInit {
  selectedReader: Reader;
  currentBadge: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private badgeService: BadgeService
  ) {}

  ngOnInit() {
    let readerID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getReaderById(readerID).subscribe({
      next: (data: Reader) => (this.selectedReader = data),
    });
    this.currentBadge = this.badgeService.getReaderBagde(
      this.selectedReader.totalMinutesRead
    );
  }

  saveChanges() {
    this.dataService.updateReader(this.selectedReader).subscribe({
      next: (data: void) =>
        console.log(`${this.selectedReader.name} updated successfully`),

      error: (err: Error) => {
        console.error(err);
      },
    });
  }
}
