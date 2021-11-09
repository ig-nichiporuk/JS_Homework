import {parseRequestURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import Error404 from './views/pages/error404.js';

import AddAndList from './views/pages/tasks/add-list.js';
import Info from './views/pages/tasks/info.js';
import Edit from './views/pages/tasks/edit.js';


import Authorization from './views/pages/authorization.js';
import Orders from "./views/pages/orders.js";
import Acts from "./views/pages/acts.js";
import Help from "./views/pages/help.js";

const Routes = {
	'/': Authorization,
	'/orders': Orders,
	'/acts': Acts,
	'/help': Help,
	'/task/:id': Info,
	'/task/:id/edit': Edit
};

function router() {
	const headerContainer = document.getElementsByTagName('header')[0],
		contentContainer = document.getElementsByTagName('main')[0],
		footerContainer = document.getElementsByTagName('footer')[0],
          header = new Header(),
          footer = new Footer();

    header.render().then(html => headerContainer.innerHTML = html);

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
		page.render(data).then(html => {
			contentContainer.innerHTML = html;
			page.afterRender();
		});
    });

    footer.render().then(html => footerContainer.innerHTML = html);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);