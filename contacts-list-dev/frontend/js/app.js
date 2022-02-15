import {parseRequestURL} from './helpers/utils';

import '../styles/main';


import Error404 from './views/pages/error404';


import Orders from './views/pages/orders';
import Order from './views/pages/order';
import Acts from './views/pages/acts';
import Contacts from './views/pages/contacts';
import Contact from './views/pages/contact';

const Routes = {
    // '/': About,
    /* '/': Authorization,*/
    '/orders': Orders,
    '/order/:id': Order,
    '/acts': Acts,
    '/': Contacts,
	'/contact/:id': Contact,
	'/contact-add': Contact
};

async function router() {
	const contentContainer = document.getElementsByClassName('contacts')[0],
		request = parseRequestURL(),
		parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
		page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();


	const data = await page.getData(),
		html = await page.render(data);

	contentContainer.innerHTML = html;

	page.afterRender();
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
