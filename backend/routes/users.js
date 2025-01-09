var express = require('express');
const { default: suggestFriends } = require('../connections/poliglota');
const { default: suggestFriendsModal } = require('../connections/multimodal');

var router = express.Router();

router.get('/', function(req, res, next) {
  id = req.query.id || 1;
  category = req.query.category ;
  suggestFriends(parseInt(id),category).then(suggestedFriends => {
    res.json(suggestedFriends);
  }
  );
});

router.get('/multimodal', function(req, res, next) {
  id = req.query.id || 1;
  category = req.query.category ;
  suggestFriendsModal(id,category).then(suggestedFriends => {
    res.json(suggestedFriends);
  }
  );
});
module.exports = router;
