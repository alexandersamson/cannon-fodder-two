export class PropertyAdjustment {
  adjustmentAmount: number;
  adjustmentFactor: number;
  levelAdjustmentAmount: number;
  levelAdjustmentFactor: number;
  constructor(
    adjustmentAmount: number = 0,
    adjustmentFactor: number = 1,
    levelAdjustmentAmount: number = 0,
    levelAdjustmentFactor: number = 1
  ) {
    this.adjustmentAmount = adjustmentAmount;
    this.adjustmentFactor = adjustmentFactor;
    this.levelAdjustmentAmount = levelAdjustmentAmount;
    this.levelAdjustmentFactor = levelAdjustmentFactor;
  }

  getAdjustment(basePropertyValue: number, level: number = 1){
    return Math.max
    (
      Math.min
      (
        ((basePropertyValue + this.adjustmentAmount + (this.levelAdjustmentAmount * level)) * this.adjustmentFactor) * (this.levelAdjustmentFactor * level),
        Number.MAX_SAFE_INTEGER-basePropertyValue
      ),
      Number.MIN_SAFE_INTEGER+basePropertyValue
    ) - basePropertyValue;
  }

}
