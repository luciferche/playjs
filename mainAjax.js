//const urlBase = 'https://pokeapi.co/api/v2/';
const urlBase = 'https://5ca7ef1b8e58df0014603a1e.mockapi.io/api/';

var resultSpan = document.getElementById('content');
var taskList = document.getElementById('taskList');
var httpRequest; 
function getTasks () {
    // var url = document.getElementById('inputUrl').value;

    getAjax('tasks');
}

function postTask (params) {
    var name = document.getElementById('inputUTaskName').value;
    var description = document.getElementById('inputUTaskDescription').value;
    var task = {
        name: name,
        description: description
    }
    postAjax(url, task);
}


function getAjax(endpoint) {

    var url = urlBase + endpoint;
    console.log('ajax GET - ' + url);
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = getCallback;
    httpRequest.open('GET', url);
    httpRequest.send();
}

function getCallback() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log('request done - status ', httpRequest.status);
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            var tasks = JSON.parse(httpRequest.responseText);
            console.log('tasks, ', tasks);
            showTasks(tasks);
            return httpRequest.responseText;
        } else {
            alert('There was a problem with the request.');
            console.error('ERROR with the request ', httpRequest.response);
        }
    } else {
        console.log('request not done ', httpRequest.readyState);
    }
}
function showTasks(tasks) {
    taskList.innerHTML = '';
    resultSpan.innerHTML = httpRequest.responseText;
    for(let i in tasks) {
        addTaskElement(tasks[i]);
    }
}

function addTaskElement(task) {
    var element = document.createElement('div');
    element.className ='task-item';
    var text = document.createTextNode(task.name + '-');
    text.className = 'task-name';
    var desc = document.createTextNode(task.description);
    desc.className = 'task-description';
    element.id = task.id;
    element.appendChild(text);
    element.appendChild(desc);
    taskList.appendChild(element);
}

function postAjax(endpoint, data) {
    var url = urlBase + endpoint;
    console.log('ajax GET - ' + url);
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    // var params = typeof data == 'string' ? data : Object.keys(data).map(
    //         function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    //     ).join('&');

    httpRequest.onreadystatechange = postCallback;
    
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8;');
    httpRequest.send(JSON.stringify(data));
}


function postCallback() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log('request done - status ', httpRequest.status);
        if (httpRequest.status === 200) {
            debugger;
            console.log('POST TASK callback', httpRequest.responseText);
            console.log('POST TASK callback data', httpRequest.responseData);
            // resultSpan.innerHTML = httpRequest.responseText;
            // return httpRequest.responseText;
        } else {
            alert('There was a problem with the request.');
            console.error('ERROR with the POST request ', httpRequest.response);
        }
    } else {
        console.log('POST request not done ', httpRequest.readyState);
    }
}