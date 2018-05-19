var expect = require("chai").expect;
var albums = require("../albums.js");

describe("Albums module", () => {

    it("returns requested album", () => {
        var result = albums.get("1999");
        expect(result).to.deep.equal({ 
                                    artist: "Prince", 
                                    title: "1999", 
                                    label: "Warners" 
                                    });
    });

    it("fails w/ invalid album", () => {
        var result = albums.get("fake");
        expect(result).to.be.undefined;
    });
    
    it("returns add album", () => {
       var addResult = albums.add("Prince", "For You", "Warners");
       expect(addResult).to.deep.include({
                                        artist: "Prince",
                                        title: "For You",
                                        label: "Warners"
                                        });
    });
    
    it("returns addfail album exists", () => {
        var addResult = albums.add("Prince", "1999", "Warners");
        expect(addResult).to.equal;
    });
    
    


/*
    

    it("fails add new book because its already existed ", () => {
        var addResult = book.add(Number(8), "Harry Potter Stone", 2007);
        expect(addResult).to.equal;
    });

    it("returns deleted book ", () => {
        var deleteResult = book.delete(Number(2));
        expect(deleteResult).to.be.equal;
    })

    it("fails delete book because its Not existed ", () => {
        var deleteResult = book.delete(Number(2));
        expect(deleteResult).to.equal;
    });

*/

});