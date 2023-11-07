/**
 * JOI Validation library.
 */
const joi = require('joi');
const { ObjectId } = require('mongodb');

/**
 * Register Book validation
 */
const registerBookValidator = (data) => {
    const schema = joi.object({
        title: joi.string().min(2).max(20).required().trim(),
        author: joi.string().min(2).max(50).required().trim(),
        summary: joi.string().required().trim()
    });
    return schema.validate(data);
}

const updateBookValidator = (data) => {
    const schema = joi.object({
        title: joi.string().min(2).max(20).trim(),
        author: joi.string().min(2).max(50).trim(),
        summary: joi.string().trim()
    }).or('title', 'author', 'summary'); // At least one field is required

    return schema.validate(data);
};

const idValidator = (data) => {
    const schema = joi.object({
        id: joi.string().custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'MongoDB ObjectId').required()
    });
    return schema.validate(data);
};


/**
 * Export Validation Modules 
 */
module.exports.registerBookValidator = registerBookValidator;
module.exports.updateBookValidator = updateBookValidator;
module.exports.idValidator = idValidator;