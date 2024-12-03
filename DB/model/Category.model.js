import mongoose, { model, Schema, Types } from "mongoose";
//Mahmoud maged  => Mahmoud-maged

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true , lowercase: true },
    slug: { type: String, required: true , lowercase: true  },
    image: { type: Object, required: true },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

categorySchema.virtual('subcategory', {
    localField: '_id',
    foreignField: 'categoryId',
    ref: 'Subcategory'

})
const categoryModel = mongoose.models.Category || model('Category', categorySchema)
export default categoryModel