;(function () {
	"use strict";

	let tasks = [
		{ 
			'name' : 'Learn JS',
			'done' : false
		},
		{ 
			'name' : 'Drink BEER',
			'done' : false
		},
		{ 
			'name' : 'Relax',
			'done' : true
		}
	];

	// localStorage.setItem('ba-todo', JSON.stringify(tasks));

	const form = document.querySelector('.ba-add-form');
	const taskTmpl = document.querySelector('[data-tmpl]').innerHTML;

	const todoList = document.getElementById('todo-list');
	const completedList = document.getElementById('completed-list');
	
	function addTaskInStorage(task = ''){
		let storageTasks = localStorage.getItem('ba-todo');
		storageTasks = JSON.parse(storageTasks) || [];
 
		let newTaskObj = {
			'name' : task,
			'done' : false
		}
		storageTasks.push(newTaskObj);

		localStorage.setItem('ba-todo', JSON.stringify(storageTasks));
	}

	// Add item to incompleted-list
	function addItem(event) {
		event.preventDefault();
		//this == form with class .ba-add-form

		const newTask = this.elements.newtask; //Insert task value from the form
		
		// Creat task li element from template
		const taskLiHtml = taskTmpl.replace(/{{task}}/gi, newTask.value);
		todoList.innerHTML += taskLiHtml;

		addTaskInStorage(newTask.value); //Save new task in localStorage

		//Clear and focus new task field
		this.reset(); //this == form with class .ba-add-form
		newTask.focus();
		
	}
	form.addEventListener('submit', addItem);
   	
	
	const todoWrap = document.querySelector('.ba-todo-list');
	
	todoWrap.addEventListener('click', doTask);
	todoWrap.addEventListener('keydown', doTask);

	function doTask(event) {
		
		const eventEl = event.target;
		const action = eventEl.dataset.action; //Move || Edit || Del		
		
		if (!action) return; // If no action exit from function

		let liTask = eventEl.closest('li');
		let taskInput = liTask.querySelector('[type="text"]');
		
		switch (action) {
			case 'move': //If we clicked on checkbox
					// Move item to completed-list
					// If checkek move task to completed list
					eventEl.checked ? completedList.append(liTask) : todoList.append(liTask);

					taskInput.readOnly = true;

					updateDone(taskInput.value); //Update localStorage
				break;
		
			case 'save': //If we clicked on edit btn
				if(event.keyCode == 13){
					taskInput.readOnly = true;
				}
				if(event.code == 'Escape'){
					taskInput.value = taskInput.dataset.defValue;
					taskInput.readOnly = true;
				}
				break;

			case 'edit': //If we clicked on edit btn
				//Store default value somewhere
				taskInput.dataset.defValue = taskInput.value;

				taskInput.readOnly = !taskInput.readOnly;
				taskInput.focus();
				taskInput.selectionStart = taskInput.value.length; // Place cursor at the value end

				break;

			case 'del': //If we clicked on del btn

				liTask.remove();
				break;

		}		

		
	}
	// Work with localStorage

	function updateDone(task){
		let storageTasks = localStorage.getItem('ba-todo');
		storageTasks = JSON.parse(storageTasks) || [];

		let updatedStorage = storageTasks.map( item => {
			if(item.name == task){
				item.done = !item.done;
			}
			return item;
		});
		
		localStorage.setItem('ba-todo', JSON.stringify(updatedStorage));

	}

	//Show task from localStorage

	function showTasksFromStorage() {
		let storageTasks = localStorage.getItem('ba-todo');
		storageTasks = JSON.parse(storageTasks) || [];

		const todoTasks = storageTasks.filter(item => item.done == false );
		const completedTasks = storageTasks.filter(item => item.done == true );

		todoTasks.forEach( task => {
			todoList.innerHTML += taskTmpl
											.replace(/{{task}}/gi, task.name);			
		});		

		completedTasks.forEach( task => {
			completedList.innerHTML += taskTmpl
												.replace(/{{task}}/gi, task.name)
												.replace(/data-done/gi, 'checked')
												;			
		});		
	
	}
	
	showTasksFromStorage();
	
})();