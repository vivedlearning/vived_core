import { Angle } from "./Angle";
import { Matrix, MatrixArray } from "./Matrix";
import { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";

describe("Matrix Value Object", () => {
  it("Forms an identity matrix", () => {
    const identity = Matrix.Identity();
    const expected = new Matrix(identityArray);
    expect(identity).toEqual(expected);
  });

  it("Forms a zero matrix", () => {
    const identity = Matrix.Zero();
    const expected = new Matrix(zeroArray);
    expect(identity).toEqual(expected);
  });

  it("Checks to see if two matricies are equal", () => {
    const m1 = new Matrix(sequentialArray);
    const m2 = new Matrix(sequentialArray);
    const m3 = new Matrix(zeroArray);

    expect(Matrix.Equal(m1, m2)).toEqual(true);
    expect(Matrix.Equal(m1, m3)).toEqual(false);
  });

  it("Checks for eqaulity during tests", () => {
    const m1 = new Matrix(sequentialArray);
    const m2 = new Matrix(sequentialArray);

    expect(m1).toEqual(m2);
  });

  it("Returns the translation", () => {
    const m1 = new Matrix(sequentialArray);

    expect(m1.translation).toEqual(new Vector3(13, 14, 15));
  });

  it("Multipiles two matricies", () => {
    const m1 = new Matrix(sequentialArray);
    const m2 = new Matrix([
      16,
      15,
      14,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
    ]);
    const expected = new Matrix([
      386,
      444,
      502,
      560,
      274,
      316,
      358,
      400,
      162,
      188,
      214,
      240,
      50,
      60,
      70,
      80,
    ]);
    const result = Matrix.Multiply(m1, m2);
    expect(result.m).toEqual(expected.m);
  });

  it("Composes an Identity matrix", () => {
    const pos = Vector3.Zero();
    const scale = Vector3.One();
    const rot = Quaternion.Identity();

    const mat = Matrix.Compose(scale, rot, pos);
    expect(mat).toEqual(Matrix.Identity());
  });

  it("Composes a matrix with a position", () => {
    const pos = new Vector3(11, 22, 33);
    const scale = Vector3.One();
    const rot = Quaternion.Identity();

    const composed = Matrix.Compose(scale, rot, pos);
    const expected = new Matrix([
      1,
      0,
      0,
      0,

      0,
      1,
      0,
      0,

      0,
      0,
      1,
      0,

      11,
      22,
      33,
      1,
    ]);
    expect(composed).toEqual(expected);
  });

  it("Composes a matrix with scale", () => {
    const pos = Vector3.Zero();
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.Identity();

    const composed = Matrix.Compose(scale, rot, pos);
    const expected = new Matrix([
      6,
      0,
      0,
      0,

      0,
      7,
      0,
      0,

      0,
      0,
      8,
      0,

      0,
      0,
      0,
      1,
    ]);
    expect(composed).toEqual(expected);
  });

  it("Composes a matrix with rotation", () => {
    // Number are from Babylon
    const pos = Vector3.Zero();
    const scale = Vector3.One();
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );

    const composed = Matrix.Compose(scale, rot, pos);
    expect(composed.m[0]).toBeCloseTo(0.5199598670005798);
    expect(composed.m[1]).toBeCloseTo(0.07624746859073639);
    expect(composed.m[2]).toBeCloseTo(0.8507808446884155);

    expect(composed.m[4]).toBeCloseTo(-0.6987635493278503);
    expect(composed.m[5]).toBeCloseTo(-0.5348952412605286);
    expect(composed.m[6]).toBeCloseTo(0.47499117255210876);

    expect(composed.m[8]).toBeCloseTo(0.4912954866886139);
    expect(composed.m[9]).toBeCloseTo(-0.8414709568023682);
    expect(composed.m[10]).toBeCloseTo(-0.22484509646892548);
  });

  it("Calculates a determinant", () => {
    const sequential = new Matrix(sequentialArray);
    expect(sequential.determinate).toEqual(0);

    const identity = Matrix.Identity();
    expect(identity.determinate).toEqual(1);

    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );

    const composed = Matrix.Compose(scale, rot, pos);
    expect(composed.determinate).toBeCloseTo(335.99999908851385); //Number is from babylon
  });

  it("Returns the translation", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );

    const composed = Matrix.Compose(scale, rot, pos);
    expect(composed.translation).toEqual(pos);
  });

  it("Returns the scale", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );

    const composed = Matrix.Compose(scale, rot, pos);
    expect(composed.scale.x).toBeCloseTo(scale.x);
    expect(composed.scale.y).toBeCloseTo(scale.y);
    expect(composed.scale.z).toBeCloseTo(scale.z);
  });

  it("Returns the negative scale", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, -7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );

    const composed = Matrix.Compose(scale, rot, pos);
    expect(composed.scale.x).toBeCloseTo(scale.x);
    expect(composed.scale.y).toBeCloseTo(scale.y);
    expect(composed.scale.z).toBeCloseTo(scale.z);
  });

  it("Returns a rotation matrix", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, -7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );

    const composed = Matrix.Compose(scale, rot, pos);
    const expected = Matrix.Compose(Vector3.One(), rot, Vector3.Zero());

    expect(Matrix.Close(composed.rotationMatrix, expected)).toEqual(true);
  });

  it("Returns the rotation", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );
    const composed = Matrix.Compose(scale, rot, pos);

    expect(Quaternion.Close(composed.rotation, rot)).toEqual(true);
  });

  it("Checks if matricies are close", () => {
    const m1 = new Matrix(sequentialArray);
    const biggerValues: MatrixArray = [...sequentialArray];
    biggerValues.forEach((val, i) => {
      biggerValues[i] = val + 0.01; //Just a little bump
    });
    const bigger = new Matrix(biggerValues);

    const smallerValues: MatrixArray = [...sequentialArray];
    smallerValues.forEach((val, i) => {
      smallerValues[i] = val - 0.01; //Just a little bump
    });
    const smaller = new Matrix(smallerValues);

    expect(Matrix.Close(m1, bigger, 0.0101)).toEqual(true);
    expect(Matrix.Close(m1, bigger, 0.0099)).toEqual(false);

    expect(Matrix.Close(m1, smaller, 0.0101)).toEqual(true);
    expect(Matrix.Close(m1, smaller, 0.0099)).toEqual(false);
  });

  it("Results in an Identity if we invert the identity", () => {
    const identity = Matrix.Identity();
    const inverted = Matrix.Invert(identity);

    expect(Matrix.Close(inverted, identity)).toEqual(true);
  });

  it("Inverts a matrix", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );
    const mat = Matrix.Compose(scale, rot, pos);
    const inverted = Matrix.Invert(mat);

    // Numbers are from babylon
    const expected = new Matrix([
      0.08665996789932251,
      -0.09982336312532425,
      0.061411935836076736,
      -0,
      0.0127079077064991,
      -0.0764136016368866,
      -0.10518387705087662,
      0,
      0.14179681241512299,
      0.06785587966442108,
      -0.028105635195970535,
      -0,
      -6.435692310333252,
      2.314870595932007,
      2.1373696327209473,
      1,
    ]);

    expect(Matrix.Close(inverted, expected)).toEqual(true);
  });

  it("Creates a rotation matrix from an axis ange angle", () => {
    const axis = new Vector3(1, 2, 3);
    const angle = Angle.FromRadians(1.3);
    const rotationMatrix = Matrix.FromRotationAxisAngle(axis, angle);

    // Numbers are from babylon
    const expected = new Matrix([
      0.3198203444480896,
      0.8772082924842834,
      -0.3580789864063263,
      0,
      -0.6679222583770752,
      0.476784884929657,
      0.5714508295059204,
      0,
      0.6720080375671387,
      0.05640731751918793,
      0.7383924126625061,
      0,
      0,
      0,
      0,
      1,
    ]);

    expect(Matrix.Close(rotationMatrix, expected)).toEqual(true);
  });

  it("Sets the transformation of a matrix", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );
    const mat = Matrix.Compose(scale, rot, pos);

    const newTrans = new Vector3(3, 2, 1);
    const newMat = Matrix.SetMatrixTranslation(mat, newTrans);
    expect(Quaternion.Close(newMat.rotation, rot)).toEqual(true);
    expect(Vector3.Close(newMat.translation, newTrans)).toEqual(true);
    expect(Vector3.Close(newMat.scale, scale)).toEqual(true);
  });

  it("Sets the rotation of a matrix", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );
    const mat = Matrix.Compose(scale, rot, pos);

    const newRotation = Quaternion.FromEuler(
      Angle.FromRadians(1.1),
      Angle.FromRadians(2.2),
      Angle.FromRadians(3.3)
    );
    const newMat = Matrix.SetMatrixRotation(mat, newRotation);
    expect(Quaternion.Close(newMat.rotation, newRotation)).toEqual(true);
    expect(Vector3.Close(newMat.translation, pos)).toEqual(true);
    expect(Vector3.Close(newMat.scale, scale)).toEqual(true);
  });

  it("Sets the scale of a matrix", () => {
    const pos = new Vector3(23, 26, 29);
    const scale = new Vector3(6, 7, 8);
    const rot = Quaternion.FromEuler(
      Angle.FromRadians(1),
      Angle.FromRadians(2),
      Angle.FromRadians(3)
    );
    const mat = Matrix.Compose(scale, rot, pos);

    const newScale = new Vector3(1, 2, 3);
    const newMat = Matrix.SetMatrixScale(mat, newScale);
    expect(Quaternion.Close(newMat.rotation, rot)).toEqual(true);
    expect(Vector3.Close(newMat.translation, pos)).toEqual(true);
    expect(Vector3.Close(newMat.scale, newScale)).toEqual(true);
  });

  it("Makes a Matrix from a Float 32 Array", () => {
    const float32Array = new Float32Array(16);
    for (let index = 0; index < 16; index++) {
      float32Array[index] = index * 2;
    }

    const matrix = Matrix.FromFloat32Array(float32Array);

    for (let index = 0; index < 16; index++) {
      expect(matrix.m[index]).toEqual(index * 2);
    }
  })

  it("Logs an error and return the identity if the float 32 array does not have 16 itesm", () => {
    const float32Array = new Float32Array(1);
    console.error = jest.fn();
    const matrix = Matrix.FromFloat32Array(float32Array);

    expect(console.error).toBeCalled();
    expect(matrix).toEqual(Matrix.Identity());
  })

  it("Flips the handedness of a transform matrix", () => {
    const matrix = new Matrix(sequentialArray);
    const flipped = Matrix.FlipTransformMatrixHand(matrix);

    for (let index = 0; index < 16; index++) {
      if (index === 2 || index === 6 || index === 8 || index === 9 || index === 14) {
        expect(matrix.m[index]).toEqual(-flipped.m[index]);
      } else {
        expect(matrix.m[index]).toEqual(flipped.m[index]);
      }
    }
  })

  it("Flips the handedness of a projection matrix", () => {
    const matrix = new Matrix(sequentialArray);
    const flipped = Matrix.FlipProjectionMatrixHand(matrix);

    for (let index = 0; index < 16; index++) {
      if (index === 8 || index === 9 || index === 10 || index === 11) {
        expect(matrix.m[index]).toEqual(-flipped.m[index]);
      } else {
        expect(matrix.m[index]).toEqual(flipped.m[index]);
      }
    }
  })
});

const identityArray: MatrixArray = [
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
];

const zeroArray: MatrixArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const sequentialArray: MatrixArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
];
