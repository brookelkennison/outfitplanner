const mongoose = require('mongoose');

const outfitsSchema = new mongoose.Schema({
    day: Number,
    topImg: String,
    bottomImg: String,
    shoesImg: String,
    accessoriesImg: String,
});

const Outfits = mongoose.model('Outfits', outfitsSchema);

module.exports = Outfits;
