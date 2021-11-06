module.exports = {
	plugins: [
		require('autoprefixer'),
		require('css-mqpacker'),  //собирает все медиа в один соответсвующий
		require('cssnano')({  //минимизирует
			preset: [
				'default', {
					discardComments: {
						removeAll: true,
					},
				}
			]
		})
	]
}
