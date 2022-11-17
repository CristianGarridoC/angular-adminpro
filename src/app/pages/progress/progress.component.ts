import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['progress.component.css']
})
export class ProgressComponent implements OnInit {
  protected percentageProgressOne: number = 0;
  protected percentageProgressTwo: number = 50;

  constructor() { }

  public ngOnInit(): void {
  }

  protected get getPercentageProgressOne(): string {
    return `${this.percentageProgressOne}%`;
  }

  protected get getPercentageProgressTwo(): string {
    return `${this.percentageProgressTwo}%`;
  }

}
