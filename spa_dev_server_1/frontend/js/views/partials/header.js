import {checkWS} from '../../helpers/utils';

import Component from '../../views/component';
import HeaderTemplate from '../../../templates/partials/header';

class Header extends Component {
    async render() {
		const request = this.request,
			auth = checkWS();
	    console.log(request.resource);
        return await (HeaderTemplate({auth, request}));
    }
	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {
		const headerTop = document.getElementsByClassName('headerMainJs')[0];

		window.onscroll = () => {
			window.scrollY > 60 ? headerTop.classList.add('scrollable') : headerTop.classList.remove('scrollable');
		};
	}
}

export default Header;
