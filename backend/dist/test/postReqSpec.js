"use strict";
describe("POST /uploads", () => {
    it("should return 'No data are sent to the server'", async () => {
        const res = await fetch("http://localhost:3000/uploads", {
            method: "POST",
        });
        const resText = await res.text();
        expect(resText).toBe("No data are sent to the server");
    });
});
