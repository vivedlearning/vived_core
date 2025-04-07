import { Angle } from "./Angle";
import { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";

export type MatrixArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export class Matrix {
  /**
   * Constructs an identity matrix
   * @returns An identity matrix
   */
  public static Identity(): Matrix {
    return new Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  /**
   * Constructs a matrix of zeros
   * @returns A matrix of zeros
   */
  public static Zero(): Matrix {
    return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  /**
   * Compares two matrices
   * @param a Matrix A
   * @param b Matrix B
   * @returns True if all the elements in matrix A are equal to all the elements of matrix B
   */
  public static Equal(a: Matrix, b: Matrix): boolean {
    let areEqual = true;
    for (let i = 0; i < 16; i++) {
      if (a._m[i] !== b._m[i]) {
        areEqual = false;
        break;
      }
    }
    return areEqual;
  }

  /**
   * Checks to see if Matrix A is close to Matrix B by comparing elements
   * @param a Matrix A
   * @param b Matrix B
   * @param threshold "Close" threshold. Defaults to 0.001
   * @returns True if all the difference between the elements in each array is less than the threshold
   */
  public static Close(a: Matrix, b: Matrix, threshold = 0.001): boolean {
    let areClose = true;
    for (let i = 0; i < 16; i++) {
      let diff = a._m[i] - b._m[i];
      if (diff < 0) {
        diff = -diff;
      }
      if (diff > threshold) {
        areClose = false;
        break;
      }
    }
    return areClose;
  }

  /**
   * Multiplies Matrix A and B (AxB)
   * @param a Matrix A
   * @param b Matrix B
   * @returns The result of AxB
   */
  public static Multiply(a: Matrix, b: Matrix): Matrix {
    const aMatrix = a._m;
    const bMatrix = b._m;
    const tm0 = bMatrix[0];
    const tm1 = bMatrix[1];
    const tm2 = bMatrix[2];
    const tm3 = bMatrix[3];
    const tm4 = bMatrix[4];
    const tm5 = bMatrix[5];
    const tm6 = bMatrix[6];
    const tm7 = bMatrix[7];
    const tm8 = bMatrix[8];
    const tm9 = bMatrix[9];
    const tm10 = bMatrix[10];
    const tm11 = bMatrix[11];
    const tm12 = bMatrix[12];
    const tm13 = bMatrix[13];
    const tm14 = bMatrix[14];
    const tm15 = bMatrix[15];

    const om0 = aMatrix[0];
    const om1 = aMatrix[1];
    const om2 = aMatrix[2];
    const om3 = aMatrix[3];
    const om4 = aMatrix[4];
    const om5 = aMatrix[5];
    const om6 = aMatrix[6];
    const om7 = aMatrix[7];
    const om8 = aMatrix[8];
    const om9 = aMatrix[9];
    const om10 = aMatrix[10];
    const om11 = aMatrix[11];
    const om12 = aMatrix[12];
    const om13 = aMatrix[13];
    const om14 = aMatrix[14];
    const om15 = aMatrix[15];

    const result1 = tm0 * om0 + tm1 * om4 + tm2 * om8 + tm3 * om12;
    const result2 = tm0 * om1 + tm1 * om5 + tm2 * om9 + tm3 * om13;
    const result3 = tm0 * om2 + tm1 * om6 + tm2 * om10 + tm3 * om14;
    const result4 = tm0 * om3 + tm1 * om7 + tm2 * om11 + tm3 * om15;

    const result5 = tm4 * om0 + tm5 * om4 + tm6 * om8 + tm7 * om12;
    const result6 = tm4 * om1 + tm5 * om5 + tm6 * om9 + tm7 * om13;
    const result7 = tm4 * om2 + tm5 * om6 + tm6 * om10 + tm7 * om14;
    const result8 = tm4 * om3 + tm5 * om7 + tm6 * om11 + tm7 * om15;

    const result9 = tm8 * om0 + tm9 * om4 + tm10 * om8 + tm11 * om12;
    const result10 = tm8 * om1 + tm9 * om5 + tm10 * om9 + tm11 * om13;
    const result11 = tm8 * om2 + tm9 * om6 + tm10 * om10 + tm11 * om14;
    const result12 = tm8 * om3 + tm9 * om7 + tm10 * om11 + tm11 * om15;

    const result13 = tm12 * om0 + tm13 * om4 + tm14 * om8 + tm15 * om12;
    const result14 = tm12 * om1 + tm13 * om5 + tm14 * om9 + tm15 * om13;
    const result15 = tm12 * om2 + tm13 * om6 + tm14 * om10 + tm15 * om14;
    const result16 = tm12 * om3 + tm13 * om7 + tm14 * om11 + tm15 * om15;
    return new Matrix([
      result1,
      result2,
      result3,
      result4,

      result5,
      result6,
      result7,
      result8,

      result9,
      result10,
      result11,
      result12,

      result13,
      result14,
      result15,
      result16,
    ]);
  }

  /**
   * Composes a matrix from a scale vector, rotation quaternion, and translation vector
   * @param scale The scale of the transformation matrix
   * @param rotation The rotation of the transformation matrix
   * @param translation The translation of the transformation matrix
   * @returns The composed matrix
   */
  public static Compose(
    scale: Vector3,
    rotation: Quaternion,
    translation: Vector3
  ): Matrix {
    const final: MatrixArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const rotX = rotation.x;
    const rotY = rotation.y;
    const rotZ = rotation.z;
    const rotW = rotation.w;

    const x2 = rotX + rotX;
    const y2 = rotY + rotY;
    const z2 = rotZ + rotZ;
    const xx = rotX * x2;
    const xy = rotX * y2;
    const xz = rotX * z2;
    const yy = rotY * y2;
    const yz = rotY * z2;
    const zz = rotZ * z2;
    const wx = rotW * x2;
    const wy = rotW * y2;
    const wz = rotW * z2;

    const scaleX = scale.x;
    const scaleY = scale.y;
    const scaleZ = scale.z;

    final[0] = (1 - (yy + zz)) * scaleX;
    final[1] = (xy + wz) * scaleX;
    final[2] = (xz - wy) * scaleX;
    final[3] = 0;

    final[4] = (xy - wz) * scaleY;
    final[5] = (1 - (xx + zz)) * scaleY;
    final[6] = (yz + wx) * scaleY;
    final[7] = 0;

    final[8] = (xz + wy) * scaleZ;
    final[9] = (yz - wx) * scaleZ;
    final[10] = (1 - (xx + yy)) * scaleZ;
    final[11] = 0;

    final[12] = translation.x;
    final[13] = translation.y;
    final[14] = translation.z;
    final[15] = 1;

    return new Matrix(final);
  }

  /**
   * Inverts a matrix into a new matrix.
   * @param matrix The matrix to invert
   * @returns The inverted matrix unless the matrix cannot be inverted, then the identity is returned
   */
  public static Invert(matrix: Matrix): Matrix {
    const m = matrix._m;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];

    const det_12_33 = m12 * m33 - m32 * m13;
    const det_11_33 = m11 * m33 - m31 * m13;
    const det_11_32 = m11 * m32 - m31 * m12;
    const det_10_33 = m10 * m33 - m30 * m13;
    const det_10_32 = m10 * m32 - m30 * m12;
    const det_10_31 = m10 * m31 - m30 * m11;
    const det_12_23 = m12 * m23 - m22 * m13;
    const det_11_23 = m11 * m23 - m21 * m13;
    const det_11_22 = m11 * m22 - m21 * m12;
    const det_10_23 = m10 * m23 - m20 * m13;
    const det_10_22 = m10 * m22 - m20 * m12;
    const det_10_21 = m10 * m21 - m20 * m11;

    const det_22_33 = m22 * m33 - m32 * m23;
    const det_21_33 = m21 * m33 - m31 * m23;
    const det_21_32 = m21 * m32 - m31 * m22;
    const det_20_33 = m20 * m33 - m30 * m23;
    const det_20_32 = m20 * m32 - m22 * m30;
    const det_20_31 = m20 * m31 - m30 * m21;

    const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
    const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
    const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
    const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);

    const det =
      m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;
    if (det === 0) return Matrix.Identity();

    const detInv = 1 / det;

    const cofact_10 = -(m01 * det_22_33 - m02 * det_21_33 + m03 * det_21_32);
    const cofact_11 = +(m00 * det_22_33 - m02 * det_20_33 + m03 * det_20_32);
    const cofact_12 = -(m00 * det_21_33 - m01 * det_20_33 + m03 * det_20_31);
    const cofact_13 = +(m00 * det_21_32 - m01 * det_20_32 + m02 * det_20_31);

    const cofact_20 = +(m01 * det_12_33 - m02 * det_11_33 + m03 * det_11_32);
    const cofact_21 = -(m00 * det_12_33 - m02 * det_10_33 + m03 * det_10_32);
    const cofact_22 = +(m00 * det_11_33 - m01 * det_10_33 + m03 * det_10_31);
    const cofact_23 = -(m00 * det_11_32 - m01 * det_10_32 + m02 * det_10_31);

    const cofact_30 = -(m01 * det_12_23 - m02 * det_11_23 + m03 * det_11_22);
    const cofact_31 = +(m00 * det_12_23 - m02 * det_10_23 + m03 * det_10_22);
    const cofact_32 = -(m00 * det_11_23 - m01 * det_10_23 + m03 * det_10_21);
    const cofact_33 = +(m00 * det_11_22 - m01 * det_10_22 + m02 * det_10_21);

    return new Matrix([
      cofact_00 * detInv,
      cofact_10 * detInv,
      cofact_20 * detInv,
      cofact_30 * detInv,
      cofact_01 * detInv,
      cofact_11 * detInv,
      cofact_21 * detInv,
      cofact_31 * detInv,
      cofact_02 * detInv,
      cofact_12 * detInv,
      cofact_22 * detInv,
      cofact_32 * detInv,
      cofact_03 * detInv,
      cofact_13 * detInv,
      cofact_23 * detInv,
      cofact_33 * detInv,
    ]);
  }

  /**
   * Creates a rotation matrix for a given axes and angle
   * @param axis The axes of rotation
   * @param angle The angle of rotation
   * @returns A new rotation matrix
   */
  public static FromRotationAxisAngle(axis: Vector3, angle: Angle): Matrix {
    const sin = Math.sin(-angle.radians);
    const cosin = Math.cos(-angle.radians);
    const c1 = 1 - cosin;

    const unit = axis.unit;
    const m: MatrixArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    m[0] = unit.x * unit.x * c1 + cosin;
    m[1] = unit.x * unit.y * c1 - unit.z * sin;
    m[2] = unit.x * unit.z * c1 + unit.y * sin;
    m[3] = 0.0;

    m[4] = unit.y * unit.x * c1 + unit.z * sin;
    m[5] = unit.y * unit.y * c1 + cosin;
    m[6] = unit.y * unit.z * c1 - unit.x * sin;
    m[7] = 0.0;

    m[8] = unit.z * unit.x * c1 - unit.y * sin;
    m[9] = unit.z * unit.y * c1 + unit.x * sin;
    m[10] = unit.z * unit.z * c1 + cosin;
    m[11] = 0.0;

    m[12] = 0.0;
    m[13] = 0.0;
    m[14] = 0.0;
    m[15] = 1.0;

    return new Matrix(m);
  }

  /**
   * Make a new transformation matrix that has the same scale and rotation as the original but the translation is set
   * @param original The original matrix
   * @param translation The new translation value
   * @returns A new matrix that is the same as the original but the translation has been changed
   */
  public static SetMatrixTranslation(
    original: Matrix,
    translation: Vector3
  ): Matrix {
    const values: MatrixArray = original.m;
    values[12] = translation.x;
    values[13] = translation.y;
    values[14] = translation.z;

    return new Matrix(values);
  }

  /**
   * Make a new transformation matrix that has the same scale and translation as the original but the rotation is set
   * @param original The original matrix
   * @param rotation The new rotation value
   * @returns A new matrix that is the same as the original but the rotation has been changed
   */
  public static SetMatrixRotation(
    original: Matrix,
    rotation: Quaternion
  ): Matrix {
    const scale = original.scale;
    const translation = original.translation;

    return Matrix.Compose(scale, rotation, translation);
  }

  /**
   * Make a new transformation matrix that has the same rotation and translation as the original but the scale is set
   * @param original The original matrix
   * @param scale The new scale value
   * @returns A new matrix that is the same as the original but the scale has been changed
   */
  public static SetMatrixScale(original: Matrix, scale: Vector3): Matrix {
    const rotation = original.rotation;
    const translation = original.translation;

    return Matrix.Compose(scale, rotation, translation);
  }

  public static FromFloat32Array(array: Float32Array): Matrix {
    if (array.length !== 16) {
      console.error("[matrixFrom32] Array does not have a length of 16");
      return Matrix.Identity();
    }

    const matrixArray: MatrixArray = [
      array[0],
      array[1],
      array[2],
      array[3],
      array[4],
      array[5],
      array[6],
      array[7],
      array[8],
      array[9],
      array[10],
      array[11],
      array[12],
      array[13],
      array[14],
      array[15],
    ];

    return new Matrix(matrixArray);
  }

  public static FlipTransformMatrixHand(matrix: Matrix): Matrix {
    const m = matrix.m;
    m[2] *= -1;
    m[6] *= -1;
    m[8] *= -1;
    m[9] *= -1;
    m[14] *= -1;

    return new Matrix(m);
  }

  public static FlipProjectionMatrixHand(matrix: Matrix): Matrix {
    const m = matrix.m;
    m[8] *= -1;
    m[9] *= -1;
    m[10] *= -1;
    m[11] *= -1;

    return new Matrix(m);
  }

  /**
   * Returns the determinate of the matrix
   */
  public get determinate(): number {
    const m = this._m;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];

    const det_22_33 = m22 * m33 - m32 * m23;
    const det_21_33 = m21 * m33 - m31 * m23;
    const det_21_32 = m21 * m32 - m31 * m22;
    const det_20_33 = m20 * m33 - m30 * m23;
    const det_20_32 = m20 * m32 - m22 * m30;
    const det_20_31 = m20 * m31 - m30 * m21;
    const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
    const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
    const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
    const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);
    return (
      m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03
    );
  }

  /**
   * Returns the translation component of the transformation matrix as a Vector
   */
  get translation(): Vector3 {
    return new Vector3(this._m[12], this._m[13], this._m[14]);
  }

  /**
   * Returns the scale of the transformation matrix as a vector
   */
  get scale(): Vector3 {
    const x = Math.sqrt(
      this._m[0] * this._m[0] +
        this._m[1] * this._m[1] +
        this._m[2] * this._m[2]
    );
    let y = Math.sqrt(
      this._m[4] * this._m[4] +
        this._m[5] * this._m[5] +
        this._m[6] * this._m[6]
    );
    const z = Math.sqrt(
      this._m[8] * this._m[8] +
        this._m[9] * this._m[9] +
        this._m[10] * this._m[10]
    );

    if (this.determinate <= 0) {
      y = -y;
    }

    return new Vector3(x, y, z);
  }

  /**
   * Returns the rotation components of the transformation matrix as a Quaternion
   */
  get rotation(): Quaternion {
    return Quaternion.FromRotationMatrix(this.rotationMatrix);
  }

  /**
   * Returns just the rotation matrix of the transformation matrix
   */
  get rotationMatrix(): Matrix {
    const scale = this.scale;
    const sx = 1 / scale.x;
    const sy = 1 / scale.y;
    const sz = 1 / scale.z;

    const rMatrixValues: MatrixArray = [
      this._m[0] * sx,
      this._m[1] * sx,
      this._m[2] * sx,
      0.0,
      this._m[4] * sy,
      this._m[5] * sy,
      this._m[6] * sy,
      0.0,
      this._m[8] * sz,
      this._m[9] * sz,
      this._m[10] * sz,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    return new Matrix(rMatrixValues);
  }

  // Row, column
  private readonly _m: MatrixArray;
  get m(): MatrixArray {
    return [...this._m];
  }

  constructor(m: MatrixArray) {
    this._m = m;
  }
}
