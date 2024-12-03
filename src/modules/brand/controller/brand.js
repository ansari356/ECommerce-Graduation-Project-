import slugify from 'slugify';
import brandModel from '../../../../DB/model/Brand.model.js';
import cloudinary from '../../../utils/cloudinary.js'
import { asyncHandler } from '../../../utils/errorHandling.js';

export const getBrand = asyncHandler(async (req, res, next) => {
    const brand = await brandModel.find()
    return res.status(200).json({ message: 'Done', brand })
})


export const createBrand = asyncHandler(async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    if (await brandModel.findOne({ name })) {
        return next(new Error(`Duplicate brand name ${name}`, { cause: 409 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/brand` })
    const brand = await brandModel.create({
        name,
        image: { secure_url, public_id },
        createdBy: req.user._id
    })
    return res.status(201).json({ message: 'Done', brand })
})

export const updateBrand = asyncHandler(async (req, res, next) => {
    const brand = await brandModel.findById(req.params.brandId)
    if (!brand) {
        return next(new Error(`In-valid brand Id`, { cause: 400 }))
    }

    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase()
        if (brand.name == req.body.name) {
            return next(new Error(`Sorry  cannot update brand with the same name`, { cause: 400 }))
        }
        if (await brandModel.findOne({ name: req.body.name })) {
            return next(new Error(`Duplicate brand name ${req.body.name}`, { cause: 409 }))
        }

        brand.name = req.body.name;
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/brand` })
        await cloudinary.uploader.destroy(brand.image.public_id)
        brand.image = { secure_url, public_id }
    }
    brand.updatedBy = req.user._id
    await brand.save()
    return res.status(200).json({ message: 'Done', brand })
})