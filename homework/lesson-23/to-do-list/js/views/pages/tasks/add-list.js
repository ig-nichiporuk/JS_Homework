import {generateID} from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
                <h1 class="page-title">Tasks List</h1>
                
                <div class="task-add">
                    <input class="task-add__title" type="text" placeholder="Task title">
                    <textarea class="task-add__description" placeholder="Task description"></textarea>
                    
                    <button class="task-add__btn-add button" disabled>Add Task</button>
                </div>       
                  
                <div class="tasks">
                    <div class="tasks__control">
	                    <p class="tasks__counter">There are <span class="green">0</span> tasks of <span class="red">0</span> are done</p>
	                    <button class="tasks__cleaner button" disabled>Clear Tasks List</button>
					</div>
                    <div class="tasks__list">
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>            
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
	    const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
		    addTaskDescription = document.getElementsByClassName('task-add__description')[0],
		    addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
		    tasksContainer = document.getElementsByClassName('tasks')[0],
		    tasksList = document.getElementsByClassName('tasks__list')[0],
		    tasksCleaner = document.getElementsByClassName('tasks__cleaner')[0],
		    counterContainer = document.getElementsByClassName('tasks__counter')[0];

	    tasksCleaner.disabled = !this.tasks.length;
	    this.showCounterTasks(counterContainer);

	    addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
	    addTaskBtn.addEventListener('click', () => this.addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList, tasksCleaner, counterContainer));
	    tasksCleaner.addEventListener('click', () => this.clearTasks(tasksCleaner,tasksList, counterContainer));

		tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch(true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode, tasksCleaner, counterContainer);
                    break;

	            case targetClassList.contains('task__btn-done'):
		            this.doneTask(target.parentNode.parentNode, counterContainer);
		            break;
            }
        });
    }

    addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList, tasksCleaner, counterContainer) {
		const newTask = {
			id: generateID(),
			title: addTaskTitle.value.trim(),
			description: addTaskDescription.value.trim().length ? addTaskDescription.value.trim() : 'No Description',
			status: 'In Progress'
		};

        this.tasks.push(newTask);
	    this.showCounterTasks(counterContainer);
        Tasks.setTasksToLS(this.tasks);

	    tasksCleaner.disabled = !this.tasks.length;

		this.clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));
    }

	clearTasks (tasksCleaner,tasksList, counterContainer) {
		if (confirm('Are you sure?')) {
			this.tasks = [];
			this.showCounterTasks(counterContainer);

			Tasks.setTasksToLS(this.tasks);

			tasksCleaner.disabled = !this.tasks.length;

			tasksList.innerHTML = '';
		}
	}

	showCounterTasks(counterContainer) {
		counterContainer.innerHTML = this.editCounterMessage();
	}

    getTaskHTML(task) {
        return `
            <div class="task ${task.status == 'Done' ? 'done' : ''}" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                ${task.status != 'Done' ? 
	                `<a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a>`
                    +'<a class="task__btn-done button">Done</a>' : 
	            ''}
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn) {
		addTaskTitle.value = '';
	    addTaskDescription.value = '';
        addTaskBtn.disabled = true;
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

	doneTask(taskContainer, counterContainer) {
		const currentEditBtn = taskContainer.getElementsByClassName('task__btn-edit')[0],
			currentDoneBtn = taskContainer.getElementsByClassName('task__btn-done')[0];

		taskContainer.classList.add('done');

		this.tasks.map(task => {
			if(task.id == taskContainer.dataset.id) {
				return task.status = 'Done';
			}
		});

		this.showCounterTasks(counterContainer);

		Tasks.setTasksToLS(this.tasks);

		currentEditBtn.remove();
		currentDoneBtn.remove();
	}

    removeTask(taskContainer, tasksCleaner, counterContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
	        this.showCounterTasks(counterContainer);

            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();

	        tasksCleaner.disabled = !this.tasks.length;
        }
    }

	counterFormat() {
		return this.countDoneTasks() == 1 ? 'is' : 'are';
	}

	countDoneTasks() {
		return [...this.tasks.filter(task => task.status == 'Done')].length;
	}

	editCounterMessage() {
		return `There ${this.counterFormat()} <span class="green">${this.countDoneTasks()}</span> tasks of <span class="red">${this.tasks.length}</span> ${this.counterFormat()} done`
	}


}

export default AddAndList;