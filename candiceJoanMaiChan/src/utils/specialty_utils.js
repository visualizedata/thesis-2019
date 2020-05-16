import * as d3 from 'd3'
import * as _ from 'lodash'

class SpecialtyUtils {
  constructor(margin){
    this.margin = margin;
    this.xStart = 0;
    this.xMove = 0;
    this.xEnd = 0;
  }

  createMeanText(la_opiod, opioid) {
    return `The Mean Rate of Prescriptions for Long Acting Opioids is ${la_opiod} and Standard Opioid is ${opioid}`;
  }

  xPositionValue(xScale) {
      const xPos = d3.event.x - this.margin.left;
      const domain = xScale.domain();
      const range = xScale.range();
      const rangePoints = d3.range(range[0], range[1], xScale.step())
      return d3.bisect(rangePoints, xPos);
  }

  dragStart(xscale) {
    this.xStart = this.xPositionValue(xscale);
  }

  dragMove(xscale) {
    this.xMove = this.xPositionValue(xscale);
    const diff = this.xStart - this.xMove;
    const direction = diff <= 0 ? 'right' : 'left';
    return {
      direction,
      diff: Math.abs(diff),
      xStart: this.xStart,
      xCurrent: this.xMove
    };
  }

  dragEnd(xscale) {
    this.xEnd = this.xPositionValue(xscale);
  }
}

export default SpecialtyUtils;
