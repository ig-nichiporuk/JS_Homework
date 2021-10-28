import {getTokenFromCookies, parseRequestURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import Authorization from './views/pages/authorization.js';
import Orders from "./views/pages/orders.js";
import Acts from "./views/pages/acts.js";
import Error404 from './views/pages/error404.js';

import AddAndList from './views/pages/tasks/add-list.js';
import Info from './views/pages/tasks/info.js';
import Edit from './views/pages/tasks/edit.js';


const Routes = {
    '/': Authorization,
    '/orders': Orders,
    '/acts': Acts,
    '/task/:id': Info,
    '/task/:id/edit': Edit
};

async function router() {
    const headerContainer = document.getElementsByTagName('header')[0],
          contentContainer = document.getElementsByTagName('main')[0],
          footerContainer = document.getElementsByTagName('footer')[0],
          header = new Header(),
          footer = new Footer();

	headerContainer.innerHTML = await header.render();
	header.afterRender();

	const request = parseRequestURL(),
		userToken = getTokenFromCookies(),
		parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`;
	let page;
	if(Routes[parsedURL]) {
		if(userToken) {
			page = new Routes[parsedURL]();
		} else {
			location.hash = '#/';
			page = new Authorization();
		}
	} else {
		page = new Error404();
	}

	contentContainer.innerHTML = await page.render();
	// page.afterRender();


	footerContainer.innerHTML = await footer.render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);