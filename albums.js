
var albums = [
    { artist : "Love", title : "Forever Changes", label : "Elektra"},
    { artist : "The Four Tops", title : "Reach Out", label : "Motown"},
    { artist : "Prince", title : "1999", label : "Warners"},
    { artist : "Roxy Music", title : "Stranded", label : "Island"},
    { artist : "Lee Hazlewood", title : "Lee Hazlewoodism - Its Cause And Cure", label : "MGM"}
];


exports.getAll = () => {
    return albums;
};

exports.get = (title) => {
    return albums.find((album) => {
        return album.title.toLowerCase() === title.toLowerCase();
    });
};

exports.delete = (title) => { 
        var index = albums.findIndex((album) => {
        return album.title.toLowerCase() === title.toLowerCase();
        });
        if (index > -1) {
             albums.splice(index, 1);
             return true;
        } else {
             return false;
        }
};
