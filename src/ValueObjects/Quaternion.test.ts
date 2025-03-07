import { Angle } from "./Angle";
import { Matrix } from "./Matrix";
import { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";
describe("Quaterion Value Object", () => {
  it("Checks for equality", () => {
    const quat1 = new Quaternion(1, 2, 3, 4);
    const quat2 = new Quaternion(1, 2, 3, 4);
    const quat3 = new Quaternion(10, 20, 30, 40);

    expect(Quaternion.Equal(quat1, quat2)).toEqual(true);
    expect(Quaternion.Equal(quat1, quat3)).toEqual(false);
  });

  it("Constructs a new quaternion from an array", () => {
    const quat = Quaternion.FromArray([1, 2, 3, 4]);
    expect(quat.x).toEqual(1);
    expect(quat.y).toEqual(2);
    expect(quat.z).toEqual(3);
    expect(quat.w).toEqual(4);
  });

  it("Constructs an identity quaternion", () => {
    const quat = Quaternion.Identity();
    expect(quat.x).toEqual(0);
    expect(quat.y).toEqual(0);
    expect(quat.z).toEqual(0);
    expect(quat.w).toEqual(1);
  });

  it("Equates two quaternions for testing", () => {
    const quat1 = new Quaternion(1, 2, 3, 4);
    const quat2 = new Quaternion(1, 2, 3, 4);

    expect(quat1).toEqual(quat2);
  });

  it("Returns an array", () => {
    const quat1 = new Quaternion(1, 2, 3, 4);
    expect(quat1.toArray()).toEqual([1, 2, 3, 4]);
  });

  it("Multiplies two quaternions", () => {
    // See https://www.omnicalculator.com/math/quaternion
    const quat1 = new Quaternion(1, 2, 3, 4);
    const quat2 = new Quaternion(5, 6, 7, 8);
    const product = Quaternion.Multiply(quat1, quat2);
    const expected = new Quaternion(24, 48, 48, -6);
    expect(product).toEqual(expected);
  });

  it("Inverts a quaternion", () => {
    const quat1 = new Quaternion(1, 2, 3, 4);
    const inverted = Quaternion.Inverse(quat1);
    const expected = new Quaternion(-1, -2, -3, 4);
    expect(inverted).toEqual(expected);
  });

  it("Creates an Quaterion from an Axis and Angle", () => {
    // See https://www.andre-gaschler.com/rotationconverter
    const axis = new Vector3(1, 2, 3);
    const angle = Angle.FromRadians(4);
    const quat = Quaternion.FromAngleAxis(axis, angle);

    expect(quat.x).toBeCloseTo(0.24302);
    expect(quat.y).toBeCloseTo(0.4860399);
    expect(quat.z).toBeCloseTo(0.7290599);
    expect(quat.w).toBeCloseTo(-0.4161468);
  });

  it("Creates an Quaterion from a Yaw Pitch Roll", () => {
    // Numbers are from the babylon playground

    const yaw = Angle.FromRadians(1);
    const pitch = Angle.FromRadians(2);
    const roll = Angle.FromRadians(3);
    const quat = Quaternion.FromYawPitchRoll(yaw, pitch, roll);

    expect(quat.x).toBeCloseTo(0.310622);
    expect(quat.y).toBeCloseTo(-0.71828);
    expect(quat.z).toBeCloseTo(0.444435);
    expect(quat.w).toBeCloseTo(0.4359528);
  });

  it("Creates an Quaterion from Euler angles", () => {
    // Numbers are from the babylon playground

    const x = Angle.FromRadians(1);
    const y = Angle.FromRadians(2);
    const z = Angle.FromRadians(3);
    const quat = Quaternion.FromEuler(x, y, z);

    expect(quat.x).toBeCloseTo(0.754933);
    expect(quat.y).toBeCloseTo(-0.206149);
    expect(quat.z).toBeCloseTo(0.444435);
    expect(quat.w).toBeCloseTo(0.4359528);
  });

  it("Slerps", () => {
    // See https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/index.htm
    const q1 = new Quaternion(0.1, 0.2, 0.3, 0.9);
    const q2 = new Quaternion(0.5, 0.8, 0.1, 0.4);

    const initial = Quaternion.Slerp(q1, q2, 0);
    expect(initial.x).toBeCloseTo(q1.x);
    expect(initial.y).toBeCloseTo(q1.y);
    expect(initial.z).toBeCloseTo(q1.z);
    expect(initial.w).toBeCloseTo(q1.w);

    const final = Quaternion.Slerp(q1, q2, 1);
    expect(final.x).toBeCloseTo(q2.x);
    expect(final.y).toBeCloseTo(q2.y);
    expect(final.z).toBeCloseTo(q2.z);
    expect(final.w).toBeCloseTo(q2.w);

    const middle = Quaternion.Slerp(q1, q2, 0.35);
    expect(middle.x).toBeCloseTo(0.27016);
    expect(middle.y).toBeCloseTo(0.46061);
    expect(middle.z).toBeCloseTo(0.25244);
    expect(middle.w).toBeCloseTo(0.7972);
  });

  it("Makes a quaterion from a rotation matrix", () => {
    const x = Angle.FromRadians(1);
    const y = Angle.FromRadians(2);
    const z = Angle.FromRadians(3);
    const originalQ = Quaternion.FromEuler(x, y, z);

    const matrix = Matrix.Compose(Vector3.One(), originalQ, Vector3.Zero());

    const result = Quaternion.FromRotationMatrix(matrix);
    expect(result.x).toBeCloseTo(originalQ.x);
    expect(result.y).toBeCloseTo(originalQ.y);
    expect(result.z).toBeCloseTo(originalQ.z);
    expect(result.w).toBeCloseTo(originalQ.w);
  });

  it("Checks if two quaternions are close", () => {
    const a = new Quaternion(1, 2, 3, 4);
    const bigger = new Quaternion(1.01, 2.01, 3.01, 4.01);
    const smaller = new Quaternion(0.99, 1.99, 2.99, 3.99);

    expect(Quaternion.Close(a, bigger, 0.0101)).toEqual(true);
    expect(Quaternion.Close(a, bigger, 0.0099)).toEqual(false);

    expect(Quaternion.Close(a, smaller, 0.0101)).toEqual(true);
    expect(Quaternion.Close(a, smaller, 0.0099)).toEqual(false);
  });

  it("Retuns the angle", () => {
    const angle = Angle.FromDegrees(25);
    const axis = new Vector3(1, 2, 3);
    const q = Quaternion.FromAngleAxis(axis, angle);

    expect(Angle.Close(q.angle, angle)).toEqual(true);
  });

  it("Retuns the axis", () => {
    const angle = Angle.FromDegrees(25);
    const axis = new Vector3(1, 2, 3);
    const q = Quaternion.FromAngleAxis(axis, angle);

    expect(Vector3.Close(q.axis, axis.unit)).toEqual(true);
  });

  it("Makes a quaternion into a rotation matrix", () => {
    const x = Angle.FromRadians(1);
    const y = Angle.FromRadians(2);
    const z = Angle.FromRadians(3);
    const originalQ = Quaternion.FromEuler(x, y, z);

    const mat = Quaternion.ToRotationMatrix(originalQ);

    expect(Quaternion.Close(mat.rotation, originalQ)).toEqual(true);
    expect(Vector3.Close(mat.scale, Vector3.One())).toEqual(true);
    expect(Vector3.Close(mat.translation, Vector3.Zero())).toEqual(true);
  });

  it("Gets the Data Transfer Object", () => {
    const quat = new Quaternion(1, 2, 3, 4);

    expect(quat.dto).toEqual({
      x: 1,
      y: 2,
      z: 3,
      w: 4,
    });
  });

  it("Makes a Quaterion from a DTO", () => {
    const quat = Quaternion.FromDTO({
      x: 1,
      y: 2,
      z: 3,
      w: 4,
    });

    expect(quat.x).toEqual(1);
    expect(quat.y).toEqual(2);
    expect(quat.z).toEqual(3);
    expect(quat.w).toEqual(4);
  });

  it("Forms a quaternion from a forward direction", () => {
    const dir = new Vector3(0, 0, 1);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.Identity();

    expect(q).toEqual(expectedQ);
  });

  it("Forms a quaternion from a right direction", () => {
    const dir = new Vector3(1, 0, 0);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(90),
      Angle.FromRadians(0),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Forms a quaternion from a left direction", () => {
    const dir = new Vector3(-1, 0, 0);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(-90),
      Angle.FromRadians(0),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Forms a quaternion from a behind direction", () => {
    const dir = new Vector3(0, 0, -1);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(180),
      Angle.FromRadians(0),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Forms a quaternion from a 45 degree up direction", () => {
    const dir = new Vector3(0, 1, 1);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(-45),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Forms a quaternion from a 45 degree up direction", () => {
    const dir = new Vector3(1, 1, 0);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(90),
      Angle.FromDegrees(-45),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Returns an identity if the direction is zero", () => {
    const dir = new Vector3(0, 0, 0);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.Identity();

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Works with an up vector", () => {
    const dir = new Vector3(0, 1, 0);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(-90),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Works with an down vector", () => {
    const dir = new Vector3(0, -1, 0);
    const q = Quaternion.FromDirectionVector(dir);

    const expectedQ = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(90),
      Angle.FromDegrees(0)
    );

    expect(Quaternion.Close(q, expectedQ)).toEqual(true);
  });

  it("Gets the angle between two quaternions", () => {
    const q1 = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(90),
      Angle.FromDegrees(0)
    );

    const q2 = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(80),
      Angle.FromDegrees(0)
    );

    const ang = Quaternion.AngleBetween(q1, q2);
    expect(ang.degrees).toBeCloseTo(10);
  });

  it("Keeps the angle between two quaternions less than 180", () => {
    const q1 = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(0),
      Angle.FromDegrees(0)
    );

    const q2 = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(200),
      Angle.FromDegrees(0)
    );

    const ang = Quaternion.AngleBetween(q1, q2);
    expect(ang.degrees).toBeCloseTo(160);
  });

  it("Returns 0 if the quaterions are the same", () => {
    const q1 = Quaternion.FromYawPitchRoll(
      Angle.FromDegrees(0),
      Angle.FromDegrees(0),
      Angle.FromDegrees(0)
    );
    const ang = Quaternion.AngleBetween(q1, q1);
    expect(ang.degrees).toEqual(0);
  });
});
