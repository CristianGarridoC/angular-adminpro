import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html'
})
export class IncreaserComponent {
  @Input() percentageProgress: number = 0;
  @Input() buttonClass: string = 'btn-primary';
  @Output() percentageProgressChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  protected get disabledSubtractButton(): boolean {
    return this.percentageProgress<=0;
  }

  protected get disabledAddButton(): boolean {
    return this.percentageProgress>=100;
  }

  protected handleChangedPercentageProgress(newPercentageProgress: number){
    let sendPercentage: number;
    if(newPercentageProgress <= 0){
      sendPercentage = 0;
    }
    else if(newPercentageProgress >= 100){
      sendPercentage = 100;
    }
    else {
      sendPercentage = newPercentageProgress;
    }
    this.percentageProgressChange.emit(sendPercentage);
  }

  protected percentageSum(): void {
    this.percentageProgress += 5;
    if(this.percentageProgress >= 100){
      this.percentageProgress = 100;
    }
    this.percentageProgressChange.emit(this.percentageProgress);
  }

  protected percentageSubtraction(): void {
    this.percentageProgress -= 5;
    if(this.percentageProgress <= 0){
      this.percentageProgress = 0;
    }
    this.percentageProgressChange.emit(this.percentageProgress);
  }

}
