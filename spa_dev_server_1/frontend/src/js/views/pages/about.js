import Component from '../../views/component.js';

import AboutTemplate from '../../../templates/pages/about.hbs';

class About extends Component {
    render() {
        return new Promise(resolve => resolve(AboutTemplate()));
    }
}

export default About;