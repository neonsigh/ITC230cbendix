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
    

});