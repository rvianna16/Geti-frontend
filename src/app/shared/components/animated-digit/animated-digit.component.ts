import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-digit',
  templateUrl: './animated-digit.component.html',
})
export class AnimatedDigitComponent implements AfterViewInit, OnChanges {
  @Input() duration!: number;
  @Input() digit!: number;
  @Input() steps!: number;
  value: number = 0;

  animateCount() {
    if (!this.duration) {
      this.duration = 1000;
    }

    if (typeof this.digit === "number") {
      this.counterFunc(this.digit, this.duration);
    }
  }

  counterFunc(endValue: number, durationMs: number) {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    const step = () => {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      this.value = Math.abs(Math.floor(currentValue));

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["digit"]) {
      this.animateCount();
    }
  }
}
