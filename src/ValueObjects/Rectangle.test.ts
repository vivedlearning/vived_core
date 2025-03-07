import {Rectangle} from "./Rectangle";

describe("Rectangle value object", ()=>{
	it("Creates and stores the values", ()=>{
		const rect = new Rectangle(1,2,3,4);
		expect(rect.top).toEqual(1);
		expect(rect.right).toEqual(2);
		expect(rect.bottom).toEqual(3);
		expect(rect.left).toEqual(4);
	})

	it("Forms a dto", ()=>{
		const rect = new Rectangle(1,2,3,4);
		expect(rect.dto.top).toEqual(1);
		expect(rect.dto.right).toEqual(2);
		expect(rect.dto.bottom).toEqual(3);
		expect(rect.dto.left).toEqual(4);
	})

	it("Forms a rectangle from the DTO", ()=>{
		const rect = Rectangle.FromDTO({
			top: 1,
			left: 2,
			bottom: 3,
			right: 4
		});
		expect(rect.top).toEqual(1);
		expect(rect.left).toEqual(2);
		expect(rect.bottom).toEqual(3);
		expect(rect.right).toEqual(4);
	})
})