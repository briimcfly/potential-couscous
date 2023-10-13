const router = require('express').Router();
const apiRoute = require('./api');

router.use('/api', apiRoute);

router.use((req,res)=> {
    return res.send('Wrong Route');
});

module.exports = router;