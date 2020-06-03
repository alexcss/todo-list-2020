;(function () {
	"use strict";

	const form = document.querySelector('.ba-add-form');
	const taskTmpl = document.querySelector('[data-tmpl]').innerHTML;

	const todoList = document.getElementById('todo-list');
	const completedList = document.getElementById('completed-list');


	// Add item to incompleted-list
	function addItem(event) {
		event.preventDefault();
		//this == form with class .ba-add-form

		const newTask = this.elements.newtask; //Insert task value from the form
		
		// Creat task li element from template
		const taskLiHtml = taskTmpl.replace(/{{task}}/gi, newTask.value);
		todoList.innerHTML += taskLiHtml;

		//Clear and focus new task field
		this.reset(); //this == form with class .ba-add-form
		newTask.focus();
	}
	form.addEventListener('submit', addItem);
   	
	
	const todoWrap = document.querySelector('.ba-todo-list');
	
	todoWrap.addEventListener('click', doTask);

	function doTask(event) {
		console.log(`Clicked inside `, this, ` on element`, event.target);

		const eventEl = event.target;

		if (eventEl.type != 'checkbox') return;

		// Move item to completed-list
		let liTask = eventEl.closest('li');

		// if(eventEl.checked){
		// 	completedList.append(liTask);
		// } else {
		// 	todoList.append(liTask);
		// }
		
		// If checkek move task to completed list
		eventEl.checked ? completedList.append(liTask) : todoList.append(liTask);
		
	}


	// Delete item
	
	 
	// Edit item


})();