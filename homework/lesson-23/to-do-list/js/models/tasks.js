import {generateID} from '../helpers/utils.js';

class Tasks {
    constructor() {
        this.defaultTasks = [
            {
                id: generateID(),
                title: 'Task 1',
	            description: 'No description',
                status: 'In Progress'
            },
            {
                id: generateID(),
                title: 'Task 2',
	            description: 'No description',
                status: 'In Progress'
            },
            {
                id: generateID(),
                title: 'Task 3',
	            description: 'No description',
                status: 'In Progress'
            },
            {
                id: generateID(),
                title: 'Task 4',
	            description: 'No description',
                status: 'In Progress'
            },
            {
                id: generateID(),
                title: 'Task 5',
	            description: 'No description',
                status: 'In Progress'
            }
        ];
    }

    getTasksFromLS() {
        return JSON.parse(localStorage.getItem('tasks')) || this.defaultTasks && Tasks.setTasksToLS(this.defaultTasks);
    }

    static setTasksToLS(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

export default Tasks;