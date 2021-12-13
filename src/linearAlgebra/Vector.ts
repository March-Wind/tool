/**
 * 目前只用于二维向量
 */
import calculation from '../mathematics/calculation'


type MultidimensionalArray = number[];
interface Prama {
  components: MultidimensionalArray;
}
// 用数组来表示二维向量和三维向量等多维轴上的向量
class Vector {
  components: MultidimensionalArray;// 记录向量的每个轴方向上的向量
  constructor(...components: number[]) {
    this.components = components;
  }

  add({ components }: Prama) { // 加法
    return new Vector(
      ...components.map((component, index) => this.components[index] + component)
    )
  }
  subtract({ components }: Prama) { // 减法
    return new Vector(
      ...components.map((component, index) => this.components[index] - component)
    )
  }
  scaleBy(number: number) { // 缩放
    return new Vector(
      ...this.components.map(component => component * number)
    )
  }
  length() {// 向量长度，勾股定理
    return Math.hypot(...this.components)
  }
  dotProduct({ components }: Prama) {// 点积 两个向量的点积等于它们各自对应分量的乘积之和。
    return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
  }
  normalization() { // 归一化，就是长度为1
    return this.scaleBy(1 / this.length())
  }
  sameDirection(vect: Vector) { // 同向
    const dotProduct = this.normalization().dotProduct(vect.normalization())
    return calculation.areEqual(dotProduct, 1)
  }
  oppositeDirection(vect: Vector) { // 反向
    const dotProduct = this.normalization().dotProduct(vect.normalization())
    return calculation.areEqual(dotProduct, -1)
  }
  perpendicularTo(vect: Vector) {
    const dotProduct = this.normalization().dotProduct(vect.normalization());
    return calculation.areEqual(dotProduct, 0)
  }
  angleBetween(other) {
    return calculation.rad2Degrees(
      Math.acos(
        this.dotProduct(other) /
        (this.length() * other.length())
      )
    )
  }
}

// read https://juejin.cn/post/6844903859689619469
export {
  Vector
}