// ============================
// DEPENDENCIES
// ============================
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Outfits = require('./models/outfits.js');
const methodOverride = require('method-override');
// ============================
//  CONFIGURATION
// ============================
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
// ============================
// DATABASE
// ============================

// ============================
// MIDDLEWARE
// ============================
app.use(express.static('public'));
// ============================
// ROUTES
// ============================
// INDEX
app.get('/outfits', (req, res) => {
    Outfits.find({}, (err, allOutfits) => {
        console.log(allOutfits);
        res.render('index.ejs', {
            outfits: allOutfits
        });
    });
});
// NEW
app.get('/outfits/new', (req, res) => {
    res.render('new.ejs');
});

// CREATE - POST
// app.get('/seed', async (req, res) => {
//   const newOutfit =
//     [
//       {
//           day: 1,
//           topImg: "https://img.shein.com/images/shein.com/201705/dc/14944649914741410769_thumbnail_600x799.jpg",
//           bottomImg: "https://img.ltwebstatic.com/images2_pi/2019/07/05/15623121093830758888_thumbnail_600x799.jpg",
//           shoesImg: "https://img.ltwebstatic.com/images2_pi/2019/05/16/15579792442268560421_thumbnail_600x799.jpg",
//           accessoriesImg: "https://ii.francescas.com/fcgi-bin/iipsrv.fcgi?FIF=/images/francescascollections//source/Jewelry_Accessories/SSN8331_gold-cl.tif&wid=2000&cvt=jpeg",
//       }, {
//           day: 2,
//           topImg: "https://img.ltwebstatic.com/images2_pi/2019/06/24/1561358691763538460_thumbnail_600x799.jpg",
//           bottomImg: "https://img.ltwebstatic.com/images2_pi/2019/04/19/15556673262235800546_thumbnail_600x799.jpg",
//           shoesImg: "https://img.ltwebstatic.com/images2_pi/2018/10/17/15397636442215170302_thumbnail_600x799.jpg",
//           accessoriesImg: "https://img.ltwebstatic.com/images2_pi/2019/05/01/15566754981633022780_thumbnail_600x799.jpg",
//       }
//   ];
//
//   try {
//     const seedItems = await Outfits.create(newOutfit);
//     res.send(seedItems);
//   } catch (err) {
//     res.send(err.message);
// }
// });
// DELETE
app.delete('/shop/:id', (req, res) => {
    Clothes.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/shop');
    });
});
// EDIT -- DID NOT WORK
app.get('/shop/:id/edit', (req, res) => {
    Clothes.findById(req.params.id, (err, foundClothes) => {
        {
        res.render('edit.js', {
        clothes: foundClothes
    });
}
});
});

// SHOW
app.get('/outfits/:id', (req, res) => {
    Outfits.findById(req.params.id, (err, foundOutfit) => {
        console.log(err);
        console.log(foundOutfit);
            res.render('show.ejs',
            {
                outfits: foundOutfit
            }
        );
        }
    );
});
//UPDATE
app.put('/outfits/:id', (req, res) => {
    Outfits.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
    res.redirect('/outfits');
});
});
// CREATE 2
app.post('/outfits', (req, res) => {
    Outfits.create(req.body, () => {
        res.redirect('/outfits');
    });
});

// ============================
// LISTENER
// ============================
app.listen(3000, () => {
    console.log('listening');
});

mongoose.connect('mongodb://localhost:27017/outfits', {
    useNewUrlParser: true});

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
