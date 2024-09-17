import _ from 'lodash'

export function clamp(val: number, min: number = 0, max: number = 1) {
  'worklet'
  return Math.min(max, Math.max(val, min))
}
export function toPercentage(bum: number) {
  'worklet'
  return bum + '%'
}

export function fractionToPercentage(bum: number) {
  'worklet'
  return toPercentage(bum * 100)
}
export class Vector {
  constructor(public x, public y) {}
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  normalize() {
    var length = this.length
    return new Vector(this.x / length, this.y / length)
  }
}
