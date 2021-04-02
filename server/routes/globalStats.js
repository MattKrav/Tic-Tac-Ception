const router = require('express').Router();
let GlobalStat = require('../models/globalstat.model');

router.route('/').get((req, res) => {
    GlobalStat.find()
        .then(globalStat => res.json(globalStat))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    GlobalStat.findById(req.params.id)
        .then(globalStat => res.json(globalStat))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const newGlobalStat = new GlobalStat({
        name: "totalGamesPlayed",
        description: "This is the number of total games played world wide",
        value: 0,
    });

    newGlobalStat.save()
        .then(() => res.json('Global State added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/totalGamesPlayed').post((req, res) => {
    GlobalStat.find({ name: "totalGamesPlayed" })
        .then(globalStat => {
            globalStat.value += 1;

            globalStat.save()
                .then(() => res.json('Global Stat totalGamesPlayed updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;