class Circular {
  //一周的弧度数为2πr/r=2π，360°角=2π弧度
  rad2Degrees(radians){ // 弧度转角度
    return  radians / (2 * Math.PI) * 360;
  }
  degrees2Radians(degrees){ // 角度转弧度
    return degrees  / 360 * 2 * Math.PI
  }
}

class Calculation extends Circular{
  EPSILON = Number.EPSILON // 表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值，因为js有一段值表示不出来。
  areEqual(num1, num2, epsilon = this.EPSILON) {
    return Math.abs(num1 - num2) < epsilon;
  }
}
export default new Calculation();