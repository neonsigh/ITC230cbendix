var Album = require("./models/Album.js");


exports.getAll = (albums) => {
  return Album.find({}, (err, albums) => {
    if (err) {
      return err;
    } 
    console.log(albums.length);
    return albums;
  });
};

/* 
this is a non-exported example of the same feature
// return all records
Album.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});
*/

// return all records that match a condition
exports.get = (title) => {
  return Album.find({'title': title}, (err, next, items) => {
   if (err) { return next(err);
   }
   console.log(items.length);
   return items;
   // other code here
  });
};


// return a single record
// next wasn't defined in most of these (so it was reading like: (err, item)). 
// i put it in sequence err, item, next in return ()... but if it doesn't work, try err, next, item
// next is the final part of the sequence in bwest file shown in class, in index.js file
exports.findOne = (title) => {
  return Album.findOne({'title': title}, (err, album, next) => {
    if (err) { 
      return next(err);
    }
    console.log(album);
    console.log(title);
    return album;
    // other code here
  });
};

// insert or update a single record
exports.add = () => {
  var newAlbum = { 'artist': 'artist', 'title': 'title', 'label': 'label' };
  return Album.update({'title':'title'}, newAlbum, {upsert:true}, (err, next, result) => {
    if (err) { 
      return next(err);
    }
    console.log(result);
    return result;
    // other code here
  }); 
};



exports.delete = () => {
  return Album.remove({'title':'title'}, {justOne: true}, (err, result, next) => {
    if (err) {
      return next(err);
    }
    console.log(result);
    return result;
  });
};
