// Order Controller
// EN: Handles order creation and Telegram integration
// UZ: Zakas yaratish va Telegram integratsiyasini boshqaradi

import { sendOrderToTelegram } from '../services/telegram.service.js'

// EN: Process new order
// UZ: Yangi zakasni qayta ishlash
export const createOrder = async (req, res) => {
	try {
		const { customer, items, totals } = req.body

		// EN: Validate order data
		// UZ: Zakas ma'lumotlarini tekshirish
		if (!customer || !items || !totals) {
			return res.status(400).json({
				success: false,
				message: 'Zakas ma\'lumotlari to\'liq emas',
			})
		}

		if (!customer.name || !customer.phone || !customer.address) {
			return res.status(400).json({
				success: false,
				message: 'Xaridor ma\'lumotlari to\'liq emas',
			})
		}

		if (items.length === 0) {
			return res.status(400).json({
				success: false,
				message: 'Savat bo\'sh',
			})
		}

		// EN: Send order to Telegram
		// UZ: Zakasni Telegram'ga yuborish
		console.log('Sending order to Telegram...', { customer, items: items.length, totals })
		const telegramResult = await sendOrderToTelegram({
			customer,
			items,
			totals,
		})

		if (telegramResult.success) {
			console.log('Telegram order sent successfully')
			// EN: Success response
			// UZ: Muvaffaqiyat javobi
			res.status(201).json({
				success: true,
				message: 'Buyurtma muvaffaqiyatli yuborildi!',
			})
		} else {
			console.error('Telegram error:', telegramResult.error)

			// EN: Telegram failed but order is still valid
			// UZ: Telegram ishlamayotgan bo'lsa ham zakas saqlanadi
			res.status(201).json({
				success: true,
				message: `Buyurtma qabul qilindi! (Telegram: ${telegramResult.error})`,
			})
		}
	} catch (error) {
		console.error('Order creation error:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi. Qayta urining.',
		})
	}
}
