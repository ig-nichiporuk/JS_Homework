import '../styles/main';

import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import Error404 from './views/pages/error404';


import Authorization from './views/pages/authorization';
import Orders from './views/pages/orders';
import Order from './views/pages/order';

const Routes = {
    // '/': About,
    '/': Authorization,
    '/orders': Orders,
    '/order/:id': Order
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

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
