import {parseRequestURL} from '../helpers/utils.js';

import Tasks from '../models/tasks.js';

class Component {
    constructor() {
        this.request = parseRequestURL();
        this.tasks = new Tasks().getTasksFromLS();
    }

    afterRender() {}
}

export default Component;