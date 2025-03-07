export interface RectangleDTO {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export class Rectangle {
  public static FromDTO(dto: RectangleDTO):Rectangle {
    return new Rectangle(dto.top, dto.right, dto.bottom, dto.left);
  }

  readonly top: number;
  readonly left: number;
  readonly bottom: number;
  readonly right: number;

  get dto(): RectangleDTO {
    return {
			top: this.top,
			bottom: this.bottom,
			left: this.left,
			right: this.right
		};
  }

  constructor(top: number, right: number, bottom: number, left: number ) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }
}
