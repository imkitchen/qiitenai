'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var markdown = require('markdown');

var PostSchema = new Schema({
    title: String,
    markdown: String,
    tags: { type: [String], index: true, default: [] },
    published: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

    
/**
 * Validations
 */


/**
 * Pre-save hook
 */
/*
PostSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();

        //this.html = markdown.toHTML(this.markdown);
        
        next();
    });
 */

module.exports = mongoose.model('Post', PostSchema);
