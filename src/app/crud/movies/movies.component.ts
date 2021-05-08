import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  // settings1: any = {
  //   licenseKey: 'non-commercial-and-evaluation',
  //   contextMenu: {
  //     items: {
  //       row_above: {
  //         title: 'Insert row above this one',
  //       },
  //       row_below: {},
  //       separator: Handsontable.plugins.ContextMenu.SEPARATOR,
  //       clear_custom: {
  //         title: 'Clear all cells',
  //         callback: function () {},
  //       },
  //     },
  //   },
  // };
  settings: any = {
    colHeaders: true,
    rowHeaders: true,
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: ['row_above', 'row_below', 'remove_row'],
    colWidths: '250px',
    width: '100%',
    manualColumnMove: true,
    manualRowMove: true,
    manualColumnResize: true,
    manualRowResize: true,
  };

  dataset: Movie[] = [
    // { id: 1, name: 'Ted Right', address: 'Wall Street' },
    // { id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue' },
    // { id: 3, name: 'Joan Well', address: 'Broadway' },
    // { id: 4, name: 'Gail Polite', address: 'Bourbon Street' },
    // { id: 5, name: 'Michael Fair', address: 'Lombard Street' },
    // { id: 6, name: 'Mia Fair', address: 'Rodeo Drive' },
    // { id: 7, name: 'Cora Fair', address: 'Sunset Boulevard' },
    // { id: 8, name: 'Jack Right', address: 'Michigan Avenue' },
  ];

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getJSON().subscribe((data: Movie[]) => {
      console.log(data[0]);
      this.dataset = data;
    });
  }
}
