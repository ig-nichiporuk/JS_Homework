import '../styles/main';

import {parseRequestURL, showL, hideL} from './helpers/utils';


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
	const contentContainer = document.getElementsByClassName('contacts')[0];

	showL();

	const request = parseRequestURL(),
		parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
		page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

	page.getData().then(data => {
		page.render(data).then(html => {
			contentContainer.innerHTML = html;
			page.afterRender();
		});
	});

	hideL();
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
