import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


export const createBrand = joi.object({
    name: joi.string().min(2).max(25).required(),
    file: generalFields.file.required()
}).required()


export const updateBrand = joi.object({
    brandId: generalFields.id,
    name: joi.string().min(2).max(25),
    file: generalFields.file
}).required()