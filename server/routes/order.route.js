// Order Routes
// EN: Routes for order management
// UZ: Zakas boshqaruv uchun routerlar

import express from 'express'
import { createOrder } from '../controllers/order.controller.js'

const router = express.Router()

// EN: POST - Create new order and send to Telegram
// UZ: POST - Yangi zakas yaratish va Telegram'ga yuborish
router.post('/', createOrder)

// EN: GET - Test Telegram connection
// UZ: Telegram ulanishini sinov
router.get('/test-telegram', async (req, res) => {
	try {
		const { sendOrderToTelegram } = await import('../services/telegram.service.js')

		const testResult = await sendOrderToTelegram({
			customer: { name: 'Test User', phone: '+998901234567', address: 'Test Address', comments: 'Test Order' },
			items: [{ name: 'Test Product', quantity: 1, price: 100 }],
			totals: { subtotal: 100, deliveryFee: 5, total: 105 }
		})

		if (testResult.success) {
			res.json({ success: true, message: 'Telegram test successful! Check your bot.' })
		} else {
			res.json({
				success: false,
				message: `Telegram test failed: ${testResult.error}`,
				token: process.env.TELEGRAM_BOT_TOKEN ? 'Set' : 'Not set',
				chatId: process.env.TELEGRAM_CHAT_ID ? 'Set' : 'Not set'
			})
		}
	} catch (error) {
		res.json({ success: false, message: `Error: ${error.message}` })
	}
})

export default router
