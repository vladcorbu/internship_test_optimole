//test for getiing filse size function

jest.setTimeout(900000);
let { getFilesizeInBytes } = require("../index");
test("Test your code", async done => {
    try {
            let filesize = getFilesizeInBytes("./images/image1.jpg");
            expect(filesize).toBe(346518);
            done();
    } catch(err) {
        done(err);
    }
    

});