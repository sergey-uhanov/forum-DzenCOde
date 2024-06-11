export default function validateHTMLString(input: string): boolean {
	// Регулярное выражение для разрешённых тегов
	const allowedTagsRegex =
		/^<\/?(strong|code|a(\s+href="[^"]*"\s+title="[^"]*")?|i)>$/

	// Ищем все теги в строке
	const allTags = input.match(/<\/?[^>]+>/g)

	if (!allTags) {
		// Если нет ни одного тега, строка считается валидной
		return true
	}

	// Проверяем, что каждый тег соответствует разрешённым тегам
	for (const tag of allTags) {
		console.log(allTags)

		if (!allowedTagsRegex.test(tag)) {
			console.log(tag)

			return false
		}
	}

	// Создаем стек для проверки правильного закрытия тегов
	const stack: string[] = []

	for (const tag of allTags) {
		// Проверяем, является ли тег закрывающим
		if (tag.startsWith('</')) {
			const tagName = tag.slice(2, -1).trim()
			if (stack.length === 0 || stack.pop() !== tagName) {
				console.log(2)

				return false
			}
		} else {
			// Если это не тег <a>, то извлекаем имя тега
			const tagName = tag.match(/^<(\w+)/)?.[1]
			if (tagName && tagName !== 'a') {
				stack.push(tagName)
			} else if (tagName === 'a') {
				// Для тегов <a> также проверяем атрибуты
				const aTagRegex = /^<a\s+href="[^"]*"\s+title="[^"]*"\s*>$/
				if (!aTagRegex.test(tag)) {
					console.log(3)

					return false
				}
				stack.push(tagName)
			}
		}
	}

	// Если стек пуст, то все теги правильно закрыты
	console.log(4)

	return stack.length === 0
}
