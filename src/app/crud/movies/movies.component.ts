import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  dataset: Movie[] = [];
  settings: any = {
    colHeaders: true,
    rowHeaders: true,
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: ['row_above', 'row_below', 'remove_row'],
    width: '100%',
    manualColumnMove:
      localStorage['tableColumnPos'] == null
        ? true
        : JSON.parse(localStorage['tableColumnPos']),
    manualColumnResize:
      localStorage['tableColumnSize'] == null
        ? [250, 250, 250, 250, 250, 250]
        : JSON.parse(localStorage['tableColumnSize']),
    afterColumnResize: function (newSize: number, column: number) {
      console.log(newSize, column);
      let parseData = JSON.parse(localStorage['tableColumnSize']);
      parseData[column] = newSize;
      localStorage.setItem('tableColumnSize', JSON.stringify(parseData));
      console.log(JSON.parse(localStorage['tableColumnSize']));
    },
    afterColumnMove: function (movedColumns: any, finalIndex: number) {
      console.log(movedColumns, finalIndex);
      let parseData = JSON.parse(localStorage['tableColumnPos']);
      let dropIndexData = parseData[finalIndex];
      let mvIndex = parseData.indexOf(movedColumns[0]);
      parseData[finalIndex] = movedColumns[0];
      parseData[mvIndex] = dropIndexData;
      localStorage.setItem('tableColumnPos', JSON.stringify(parseData));
    },
  };

  constructor(public movieService: MoviesService) {
    if (!localStorage.hasOwnProperty('tableColumnSize')) {
      let size = [250, 250, 250, 250, 250, 250];
      localStorage.setItem('tableColumnSize', JSON.stringify(size));
    }
    if (!localStorage.hasOwnProperty('tableColumnPos')) {
      let size = [0, 1, 2, 3, 4, 5];
      localStorage.setItem('tableColumnPos', JSON.stringify(size));
    }
  }

  ngOnInit(): void {
    this.movieService.getJSON().subscribe((data: Movie[]) => {
      this.dataset = data;
    });
  }
}
