const express = require('express');
const router = express.Router();
const { isProduction } = require('../../config/keys')


if (!isProduction) {
    /* GET users listing. */
    router.get('/restore', function (req, res, next) {
        const csrfToken = req.csrfToken()
        res.status(200).json({
            "CSRF-Token": csrfToken

        })
    });

}



module.exports = router;