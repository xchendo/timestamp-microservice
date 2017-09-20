const express = require('express');
const router = express.Router();
const moment = require('moment');

router.get('/:date', (req, res) => {
  var date = req.params.date;
  var unix = strToUnix(date);
  if(unix){
    var natural = unixToNatural(unix);
    res.send({
      unix: unix,
      natural: natural
    });
  } else {
    res.send({
      unix: null,
      natural: null
    });
  }

});

function strToUnix(str){
  var unix = parseInt(str);
  if (Number.isNaN(unix)){
    unix = new Date(str).getTime()/1000;
    if(Number.isNaN(unix)){
      return null;
    }
  }
  return unix;
}

// Use momentjs for easiest date formatting.
function unixToNatural(dateTS){
  var date = moment(parseInt(dateTS)*1000);
  return date.format("MMMM D, YYYY");
}

module.exports = router;