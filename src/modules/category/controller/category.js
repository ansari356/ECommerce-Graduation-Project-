import slugify from 'slugify';
import categoryModel from '../../../../DB/model/Category.model.js';
import cloudinary from '../../../utils/cloudinary.js'
import { asyncHandler } from '../../../utils/errorHandling.js';

export const getCategory = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.find()
    return res.status(200).json({ message: 'Done', category })
})


export const createCategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    if (await categoryModel.findOne({ name })) {
        return next(new Error(`Duplicate category name ${name}`, { cause: 409 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` })
    const category = await categoryModel.create({
        name,
        slug: slugify(name, '-'),
        image: { secure_url, public_id },
        createdBy: req.user._id
    })
    return res.status(201).json({ message: 'Done', category })
})

export const updateCategory = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.categoryId)
    if (!category) {
        return next(new Error(`In-valid category Id`, { cause: 400 }))
    }

    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase()
        if (category.name == req.body.name) {
            return next(new Error(`Sorry  cannot update category with the same name`, { cause: 400 }))
        }
        if (await categoryModel.findOne({ name: req.body.name })) {
            return next(new Error(`Duplicate category name ${req.body.name}`, { cause: 409 }))
        }

        category.name = req.body.name;
        category.slug = slugify(req.body.name, '-')
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` })
        await cloudinary.uploader.destroy(category.image.public_id)
        category.image = { secure_url, public_id }
    }
    category.updatedBy = req.user._id
    await category.save()
    return res.status(200).json({ message: 'Done', category })
})