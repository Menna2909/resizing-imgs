"use strict";
describe("GET /", () => {
    it("should return a welcome message that redirects the user into the right path", () => {
        fetch("http://localhost:3000/")
            .then((res) => {
            return res.text();
        })
            .then((res1) => {
            expect(res1).toBe("Hello, this is resizing images server. \n if you are trying to use it, you must send request on the path : 'http://localhost:3000/uploads'.\n Thanks for your time!");
        });
    });
});
