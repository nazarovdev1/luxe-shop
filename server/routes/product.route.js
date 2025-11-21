import express from 'express'
import {
	deleteProduct,
	getProduct,
	getRelatedProducts,
	getSingleProduct,
	postProduct,
	putProduct,
} from '../controllers/prouduct.controller.js'

const router = express.Router()

router.get('/', getProduct)
router.get('/:id', getSingleProduct)
router.get('/:id/related', getRelatedProducts)
router.post('/', postProduct)
router.put('/:id', putProduct)
router.delete('/:id', deleteProduct)

export default router
