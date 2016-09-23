var express = require('express');
var _ = require('lodash');
var router = express.Router();

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

/* GET mocks listing. */
router.post('/1.0/tax/get', function(req, res, next) {
    var amount = req.body.Lines[0].Amount;
    var taxes = [{
        TaxName: 'CANADA GST/TPS',
        Rate: 0.05,
        Tax: 0
    }, {
        TaxName: 'QUEBEC QST/TVQ',
        Rate: 0.09975,
        Tax: 0
    }];

    var avatax = {
        TaxSummary: taxes,
        TotalTax: 0
    };

    _.each(taxes, function(tax) {
        tax.Tax = roundToTwo(amount * tax.Rate);
        avatax.TotalTax = avatax.TotalTax + tax.Tax;
    });

    res.send(avatax);
});

module.exports = router;
