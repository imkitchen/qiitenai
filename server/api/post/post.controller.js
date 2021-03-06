'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');

// Get list of posts
exports.index = function(req, res) {
    Post
        .find()
        .where({ 'published': true })
        .populate('user')
        .exec(function (err, posts) {
            if(err) { return handleError(res, err); }
            return res.json(200, posts);
        });
};

exports.user_index = function(req, res) {
    var userId = req.user._id;
    Post
        .find()
        .where({ user: userId, 'published': true })
        .exec(function (err, posts) {
            console.log(posts);
            if(err) { return handleError(res, err); }
            return res.json(200, posts);
        });
};

exports.u_index = function(req, res) {
    var userId = req.params.id;
    Post
        .find()
        .where({ published: true, user: userId })
        .exec(function(err, posts) {
            if(err) { return handleError(res, err); }
            return res.json(200, posts);
        });
};

// Get a single post
exports.show = function(req, res) {
    Post
        .findById(req.params.id)
        .populate('user')
        .exec(function (err, post) {
            if(err) { return handleError(res, err); }
            if(!post) { return res.send(404); }
            return res.json(post);
        });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.json(201, post);
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
