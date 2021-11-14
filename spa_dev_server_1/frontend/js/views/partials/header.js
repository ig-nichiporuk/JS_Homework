import Component from '../../views/component';

import HeaderTemplate from '../../../templates/partials/header';

class Header extends Component {
    async render() {
        const resource = this.request.resource;

        return await (HeaderTemplate({
            isAboutPage: !resource,
            isTasksPage: (resource === 'tasks')
        }));
    }
}

export default Header;
