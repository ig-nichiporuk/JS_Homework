import {parseRequestURL} from './helpers/utils';

import '../styles/main';


import Error404 from './views/pages/error404';
import Contacts from './views/pages/contacts';
import Contact from './views/pages/contact';

const Routes = {
    '/': Contacts,
	'/contact/:id': Contact,
	'/contact-add': Contact
};

async function router() {
	const contentContainer = document.getElementsByClassName('contacts')[0],
		request = parseRequestURL(),
		parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
		page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();


	const data = await page.getData();

	contentContainer.innerHTML = await page.render(data);

	page.afterRender(data);
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);

window.addEventListener('hashchange', router);
