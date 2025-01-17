const Musician = require('../models/musicians');
const Instrument = require('../models/instruments');

module.exports = {
  index,
  newMusician,
  create,
  show,
  editMusician,
  update,
  deleteMusician,
};

async function index(req, res) {
  const musicianDoc = await Musician.find();
  const instDoc = await Instrument.find();
  // console.log(instDoc, '<- instDoc: ctrl/musicians/index()');
  try {
    res.render('../views/musicians/index.ejs', {
      musicians: musicianDoc,
      instruments: instDoc,
      title: 'Jaw Dropping Musician',
    });
  } catch (err) {
    res.send(err);
  }
}

async function newMusician(req, res) {
  try {
    const instDoc = await Instrument.find();
    res.render('../views/musicians/new.ejs', {
      instruments: instDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

async function create(req, res) {
  try {
    // converts country code to country name
    // const countryName = new Intl.DisplayNames(['en'], { type: 'region' });
    // req.body.country = countryName.of(req.body.country);
    const musicianDoc = await Musician.create(req.body);
    res.redirect('/jdmusicians');
  } catch (err) {
    console.log(err, '<- err: controller/musicians/create()');
    return res.render('../views/musicians/new.ejs');
  }
}
async function show(req, res) {
  try {
    const musicianDoc = await Musician.findById(req.params.id);
    const instDoc = await Instrument.find({ _id: musicianDoc.instrument });
    // console.log(req.params.id, '<- req.params.id: ctrl/musicians/show()');
    // console.log(instDoc, '<- instDoc: ctrl/music/show()');
    // console.log(musicianDoc, '<- musicianDoc.req.params.id: ctrl/music/show()');
    res.render('../views/musicians/show.ejs', {
      musicians: musicianDoc,
      instruments: instDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteMusician(req, res) {
  try {
    res.redirect('/jdmusicians');
    const musicianToDel = await Musician.findById(req.params.id);
    // console.log(musicianToDel, '<-musicianToDel: deleteMusician()');
    musicianToDel.remove(req.params.id);
    await musicianToDel.save();
  } catch (err) {
    console.log(err, '<- err: controller/musicians/deleteMusician()');
    return res.render('../views/musicians/show.ejs');
  }
}

async function editMusician(req, res) {
  try {
    const musicianDoc = await Musician.findById(req.params.id);
    const instDoc = await Instrument.find();
    res.render('../views/musicians/edit.ejs', {
      instruments: instDoc,
      musicians: musicianDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

function update(req, res) {
  Musician.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
    if (err) {
      res.send(err);
      console.log(err, '<--err: ctrl/musicians/update()');
    }
    res.redirect(`/jdmusicians/${req.params.id}`);
  });
}
