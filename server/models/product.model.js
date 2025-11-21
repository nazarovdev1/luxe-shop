import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	old_price: {
		type: Number,
		default: null,
	},
	categoryId: {
		type: Number,
		required: true,
	},
	images: {
		type: [String],
		required: true,
	},
	status: {
		type: String,
		default: 'active',
	},
	rating: {
		type: Number,
		default: 0,
	},
	colors: {
		type: [String],
		default: [],
	},
	dimensions: {
		type: [String],
		default: [],
	},
	description: {
		type: String,
		default: '',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Product = mongoose.model('Product', productSchema)

export default Product
