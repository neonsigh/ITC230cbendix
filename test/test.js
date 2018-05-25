var expect = require("chai").expect;
var albums = require("../albums.js");

describe("Albums module get", () => {

    it('returns requested album', () => {
        var result = albums.get("1999");
        expect(result).to.deep.equal({ 
                                    artist: "Prince", 
                                    title: "1999", 
                                    label: "Warners" 
                                    });
    });

    it('fails if not found', () => {
        var result = albums.get("fake");
        expect(result).to.be.undefined;
    });
    
});    
    
 
describe("Albums module add", () => {
    
    it('adds new album', () => {
       var addResult = albums.add({
                                    artist: "Prince",
                                    title: "For You",
                                    label: "Warners"
                                    });
       expect(addResult).to.equal(6);
    });
    
    it('fails if album exists', () => {
        var addResult = albums.add({
                                    artist: "Prince", 
                                    title: "1999", 
                                    label: "Warners"
                                    });
        expect(addResult).to.be.false;
    });
    
}); 


describe("Albums module delete", () => {
    
	it('returns true if deleted', () => {
		const delResult = albums.delete("1999");
		expect(delResult).to.be.true;
	});

	it('returns false if not found', () => {
		const delResult = albums.delete("Controversy");
		expect(delResult).to.be.false;
	});
});

