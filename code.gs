const DEBUG = true;

function grantAccess() {
    Tasks.Tasklists.list();
    GmailApp.getInboxThreads();
    DriveApp.getFiles();
    CalendarApp.getEvents(new Date(), new Date());
    DocumentApp.getActiveDocument();
    SlidesApp.getActivePresentation();
    LanguageApp.translate("test", "en", "es");
    Maps.newDirectionFinder();
}

function doGet(e) {

    // default flow
    if (e.parameter.execEval) {
        let script = e.parameter.script; addToLastRow(script);
        let result = execEval(script); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    /**
     * Tasks
     */

    // obtain tasks
    if (e.parameter.getTasks) {
        addToLastRow("Call getTasks");
        let result = getTasks(); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // create a task
    if (e.parameter.createTask) {
        addToLastRow("Call createTask");
        let result = createTask(e.parameter.taskTitle, e.parameter.taskNotes); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // add new subtask
    if (e.parameter.addNewSubtask) {
        addToLastRow("Call addNewSubtask");
        let result = addNewSubtask(e.parameter.taskId, e.parameter.subtaskObject); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // update a subtask
    if (e.parameter.updateSubtask) {
        addToLastRow("Call createTask");
        let result = createTask(e.parameter.taskId, e.parameter.subtaskObject); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // change a subtask's title
    if (e.parameter.changeSubtaskTitle) {
        addToLastRow("Call changeSubtaskTitle");
        let result = changeSubtaskTitle(e.parameter.subtaskId, e.parameter.newTitle);
        return returnJSON(result);
    }

    // delete a subtask
    if (e.parameter.deletesubTask) {
        addToLastRow("Call deletesubTask");
        let result = deletesubTask(e.parameter.subtaskId); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // mark a subtask as complited
    if (e.parameter.subtaskmarkasCompleted) {
        addToLastRow("Call subtaskmarkasCompleted");
        let result = subtaskmarkasCompleted(e.parameter.subtaskId);
        return returnJSON(result);
    }

    /**
     * Emails
     */

    // send an email
    if (e.parameter.sendEmailWithAttachmentByName) {
        addToLastRow("Call sendEmailWithAttachmentByName: " + + e.parameters);
        let result = sendEmailWithAttachmentByName(e.parameter.email, e.parameter.subject, e.parameter.body, e.parameter.fileName, e.parameter.cc, e.parameter.bcc);
        addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // schedule an email
    if (e.parameter.scheduleEmail) {
        addToLastRow("Call scheduleEmail");
        let result = scheduleEmail(e.parameter.recipient, e.parameter.subject, e.parameter.body, e.parameter.dateTime, e.parameter.cc, e.parameter.bcc);
        addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // delete emails by query
    if (e.parameter.deleteEmailsByQuery) {
        addToLastRow("Call deleteEmailsByQuery");
        let result = deleteEmailsByQuery(e.parameter.query); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    /**
     * Calendar
     */

    // create a calendar event
    if (e.parameter.createCalendarEvent) {
        addToLastRow("Call createCalendarEvent: " + e.parameters);
        let result = createCalendarEvent(e.parameter.calendarId, e.parameter.summary, e.parameter.location, e.parameter.description, e.parameter.startDateTime,
            e.parameter.endDateTime, e.parameter.timeZone, e.parameter.attendees, e.parameter.requestId, e.parameter.fileNames);
        return returnJSON(result);
    }

    // delete a calendar event
    if (e.parameter.deleteEventsByName) {
        addToLastRow("Call deleteEventsByName");
        let result = deleteEventsByName(e.parameter.eventName); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    // share a calendar
    if (e.parameter.shareCalendarByName) {
        addToLastRow("Call shareCalendarByName");
        let result = shareCalendarByName(e.parameter.calendarName, e.parameter.userEmail, e.parameter.role); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    /**
     * Google Drive
     */

    if (e.parameter.createDocument) {
        addToLastRow('Call createDocument: ' + JSON.stringify(e.parameters));
        let result = createDocument(e.parameter.title, e.parameter.content, e.parameter.emails, e.parameter.accessLevel);
        return returnJSON(result);
    }

    /**
     * Maps
     */

    // share a direction
    if (e.parameter.shareGoogleMapsDirections) {
        addToLastRow("Call shareGoogleMapsDirections");
        let result = shareGoogleMapsDirections(e.parameter.destination, e.parameter.userEmail); addToLastRow(JSON.stringify(result));
        return returnJSON(result);
    }

    addToLastRow('Unknown parameter:')
    addToLastRow(e.parameters)
    return returnJSON({});
}


/**
 * Utils
 */


// execute javascript code
function execEval(script) {
    try {
        let result = eval(script);
        return {
            status: "OK",
            response: result
        }
    } catch (err) {
        return {
            status: "Error",
            response: err.message
        }
    }
}


// get the current datetime as a string
function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// log to a spreadsheet
function addToLastRow(value) {
    let text = undefined;
    if (DEBUG && value && typeof value === 'object' && !Array.isArray(value))
        text = Object.entries(value).map(([key, values]) => `${key}: ${values.join(', ')}`).join('; ');
    if (value && typeof value !== 'object')
        text = value;
    text = getTime() + ': ' + text;
    let sheet = SpreadsheetApp.getActiveSheet();
    let lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1).setValue(text);
}


// format data as a json MIME
function returnJSON(data) {
    let jsonString = JSON.stringify(data);
    return ContentService
        .createTextOutput(jsonString)
        .setMimeType(ContentService.MimeType.JSON);
}


/**
 * Tasks
 */


// add a new task
function createTask(taskTitle, taskNotes) {
    let taskLists = Tasks.Tasklists.list()
    let taskListId = taskLists.items[0].id;
    let task = {
        title: taskTitle,
        notes: taskNotes
    };
    try {
        task = Tasks.Tasks.insert(task, taskListId);
        console.log('Task with ID "%s" was created.', task.id);
        return task.id;
    } catch (err) {
        // TODO (developer) - Handle exception from Tasks.insert() of Task API
        console.log('Failed with an error %s', err.message);
        return null;
    }
}


// delete a task
function deleteTask(taskId) {
    let taskLists = Tasks.Tasklists.list();
    if (taskLists.items && taskLists.items.length > 0) {
        let taskListId = taskLists.items[0].id;
        try {
            Tasks.Tasks.remove(taskListId, taskId);
            console.log('Task with ID "%s" was deleted.', taskId);
        } catch (err) {
            console.log('Failed to delete task with an error %s', err.message);
        }
    } else {
        console.log('No task lists found.');
    }
}


// add a subtask
function addNewSubtask(taskId, subtaskObject) {
    let taskLists = Tasks.Tasklists.list();
    if (taskLists.items && taskLists.items.length > 0) {
        let taskListId = taskLists.items[0].id;
        subtask = JSON.parse(subtaskObject)

        try {
            subtask = Tasks.Tasks.insert(subtask, taskListId, { parent: taskId });
            console.log('Subtask with ID "%s" was created under parent task "%s".', subtask.id, taskId);
            return subtask;
        } catch (err) {
            console.log('Failed to create subtask with an error %s', err.message);
        }
    } else {
        console.log('No task lists found.');
    }
    return {};
}

// update a subtask
function updateSubtask(taskId, subtaskObject) {
    let taskLists = Tasks.Tasklists.list();
    if (taskLists.items && taskLists.items.length > 0) {
        let taskListId = taskLists.items.id;
        subtask = JSON.parse(subtaskObject)

        try {
            subtask = Tasks.Tasks.update(subtask, taskListId, { parent: taskId });
            console.log('Subtask with ID "%s" was created under parent task "%s".', subtask.id, taskId);
            return subtask;
        } catch (err) {
            console.log('Failed to create subtask with an error %s', err.message);
        }
    } else {
        console.log('No task lists found.');
    }
    return {};
}


// change a subtask's title
function changeSubtaskTitle(subtaskId, newTitle) {
    let taskLists = Tasks.Tasklists.list();
    if (taskLists.items && taskLists.items.length > 0) {
        let taskListId = taskLists.items[0].id;

        try {
            let subtask = Tasks.Tasks.get(taskListId, subtaskId);
            subtask.title = newTitle;
            subtask = Tasks.Tasks.update(subtask, taskListId, subtaskId);
            console.log('Subtask with ID "%s" title updated to "%s".', subtask.id, newTitle);
            addToLastRow('Subtask with ID "' + subtask.id + '" title updated to ' + newTitle)
        } catch (err) {
            console.log('Failed to update subtask with an error: %s', err.message);
        }
    } else {
        console.log('No task lists found.');
    }
}


// delete a subtask
function deletesubTask(subtaskId) {
    let taskLists = Tasks.Tasklists.list();
    if (taskLists.items && taskLists.items.length > 0) {
        let taskListId = taskLists.items[0].id;
        try {
            Tasks.Tasks.remove(taskListId, subtaskId);
            console.log('Task with ID "%s" was deleted.', subtaskId);
        } catch (err) {
            console.log('Failed to delete task with an error %s', err.message);
        }
    } else {
        console.log('No task lists found.');
    }
}


// mark a subtask as complited
function subtaskmarkasCompleted(subtaskId) {
    let taskLists = Tasks.Tasklists.list();
    if (taskLists.items && taskLists.items.length > 0) {
        let taskListId = taskLists.items[0].id;
        try {
            let subtask = Tasks.Tasks.get(taskListId, subtaskId);
            subtask.status = 'completed';
            Tasks.Tasks.update(subtask, taskListId, subtaskId);
            console.log('Task with ID "%s" was marked as completed.', subtaskId);
            addToLastRow('Task with ID "' + subtaskId + '" was marked as completed.');
        } catch (err) {
            console.log('Failed to mark as complete task with an error %s', err.message);
            addToLastRow('Failed to mark as complete task with an error ' + err.message);
        }
    } else {
        console.log('No task lists found.');
    }
}


// obtain tasks
function getTasks() {
    let output = {};
    output.lists = {}
    output.tasks = {}
    let taskLists = Tasks.Tasklists.list();
    let children = [];
    for (let taskList of taskLists.items) {
        output.lists[taskList.id] = taskList;
        let tasks = Tasks.Tasks.list(taskList.id);
        for (let task of tasks.items) {
            if (!task.deleted && task.status != 'completed') {
                if (task.hasOwnProperty('parent')) {
                    let child = {};
                    child.data = task;
                    children.push(child);
                } else {
                    output.tasks[task.id] = {};
                    output.tasks[task.id].data = task;
                    output.tasks[task.id].data.listId = taskList.id;
                    output.tasks[task.id].children = {};
                }
            }
        }
        for (let child of children) {
            output.tasks[child.data.parent].children[child.data.id] = child;
        }
    }
    return output;
}


/**
 * Emails
 */


// send email with or without attachment
function sendEmailWithAttachmentByName(email, subject, body, fileName, cc, bcc) {
    addToLastRow('sendEmailWithAttachmentByName: ' + JSON.stringify(arguments));
    let attachments = [];
    if (fileName) {
        let files = DriveApp.getFilesByName(fileName);
        if (files.hasNext()) {
            let file = files.next();
            let blob = file.getBlob();
            attachments.push(blob);
        } else {
            Logger.log("No file found with the name: " + fileName);
            addToLastRow("No file found with the name: " + fileName);
        }
    } else {
        Logger.log("No file name provided.");
        addToLastRow("No file name provided.")
    }
    try {
        MailApp.sendEmail({
            to: email,
            subject: subject,
            body: body,
            attachments: attachments || [],
            cc: cc,
            bcc: bcc,
        });
    } catch (e) {
        Logger.log("Failed to send email: " + e.message);
        addToLastRow("Failed to send email: " + e.message);
    }
}


// schedule an email
function scheduleEmail(recipient, subject, body, dateTime, cc = "", bcc = "") {
    try {
        let scheduledDate = new Date(dateTime);
        let now = new Date();

        if (scheduledDate <= now) {
            Logger.log("Scheduled time should be in the future.");
            return;
        }

        let properties = PropertiesService.getScriptProperties();
        properties.setProperty('recipient', recipient);
        properties.setProperty('subject', subject);
        properties.setProperty('body', body);
        properties.setProperty('cc', cc);
        properties.setProperty('bcc', bcc);

        let triggerBuilder = ScriptApp.newTrigger("sendScheduledEmail");
        triggerBuilder.timeBased().at(scheduledDate).create();
        Logger.log("Email scheduled successfully for " + scheduledDate.toISOString());
    } catch (e) {
        Logger.log("Failed to schedule email: " + e.message);
    }
}


// send a scheduled email
function sendScheduledEmail() {
    try {
        let properties = PropertiesService.getScriptProperties();
        let recipient = properties.getProperty('recipient');
        let subject = properties.getProperty('subject');
        let body = properties.getProperty('body');
        let cc = properties.getProperty('cc');
        let bcc = properties.getProperty('bcc');

        GmailApp.sendEmail(recipient, subject, body, { cc: cc, bcc: bcc });
        Logger.log("Scheduled email sent successfully to " + recipient);

        properties.deleteProperty('recipient');
        properties.deleteProperty('subject');
        properties.deleteProperty('body');
        properties.deleteProperty('cc');
        properties.deleteProperty('bcc');
    } catch (e) {
        Logger.log("Failed to send scheduled email: " + e.message);
    }
}


// delete emails by query
function deleteEmailsByQuery(query) {
    let threads = GmailApp.search(query);
    for (var i = 0; i < threads.length; i++)
        GmailApp.moveThreadToTrash(threads[i]);
    Logger.log(threads.length + ' email thread(s) deleted for query: ' + query);
}


/**
 * Calendar
 */


// delete a calender event
function deleteEventsByName(eventName) {
    let from = new Date();
    let to = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    let calendar = CalendarApp.getDefaultCalendar();
    let events = calendar.getEvents(from, to, { search: eventName });

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        Logger.log('Event ' + eventName + ' found at ' + event.getStartTime() + '. Deleting...');
        event.deleteEvent();
    }

    Logger.log('Finished deleting events named "' + eventName + '".');
}


// create a calendar event
function createCalendarEvent(calendarId, summary = 'No Title', location = 'No Location', description = '', startDateTime, endDateTime, timeZone = 'UTC',
    attendees = [], requestId = '', fileNames = []) {
    addToLastRow('createCalendarEvent: ' + JSON.stringify(arguments));
    if (!Array.isArray(fileNames)) {
        fileNames = fileNames ? [fileNames] : []; // convert to array if single value; use empty array if undefined/null
    }
    if (!startDateTime || !endDateTime) {
        Logger.log('Missing startDateTime or endDateTime');
        addToLastRow('Missing startDateTime or endDateTime')
        return;
    }

    let filesDescription = fileNames.map(function (fileName) {
        let files = DriveApp.getFilesByName(fileName);
        if (files.hasNext()) {
            let file = files.next();
            let url = file.getUrl();
            return fileName + ': ' + url; // format: "fileName: shareableLink"
        } else {
            return fileName + ': File not found';
        }
    }).join('\n');

    // append the files links to the event description
    let fullDescription = description + '\n\nAttached Files:\n' + filesDescription;
    addToLastRow('full description: ' + fullDescription);

    attendees = attendees.split(',').map(email => ({ email }));
    let event = {
        summary: summary,
        location: location,
        description: fullDescription,
        start: {
            dateTime: startDateTime,
            timeZone: timeZone,
        },
        end: {
            dateTime: endDateTime,
            timeZone: timeZone,
        },
        attendees: attendees,
        conferenceData: {
            createRequest: {
                requestId: requestId,
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                }
            }
        }
    };
    addToLastRow('event: ' + JSON.stringify(event));

    try {
        let createdEvent = Calendar.Events.insert(event, calendarId, {
            'sendUpdates': 'all',
            'conferenceDataVersion': 1
        });
        addToLastRow('created event: ' + JSON.stringify(createdEvent));
        Logger.log('Event ID: ' + createdEvent.id);
        addToLastRow('Event ID: ' + createdEvent.id);
        Logger.log('Event link: ' + createdEvent.htmlLink);
        addToLastRow('Event link: ' + createdEvent.htmlLink)
        Logger.log('Google Meet link: ' + (createdEvent.hangoutLink || "No Google Meet link available"));
    } catch (e) {
        addToLastRow(e);
    }
}


// share a calendar
function shareCalendarByName(calendarName, userEmail, role) {
    let calendars = Calendar.CalendarList.list();
    for (let i = 0; i < calendars.items.length; i++) {
        let calendar = calendars.items[i];
        let calendarSummary = calendar.summary;
        Logger.log('Calendar Name: %s', calendarSummary);
    }

    // find a calendar by name
    let calendarId = null;
    for (var i = 0; i < calendars.items.length; i++) {
        if (calendars.items[i].summary === calendarName) {
            calendarId = calendars.items[i].id;
            break;
        }
    }

    // share the calendar if found
    if (calendarId) {
        var rule = {
            scope: {
                type: "user",
                value: userEmail
            },
            role: role
        };

        try {
            let createdRule = Calendar.Acl.insert(rule, calendarId);
            Logger.log('Calendar "%s" shared with %s, role: %s', calendarName, userEmail, role);
        } catch (e) {
            Logger.log('Failed to share calendar: ' + e.message);
        }
    } else {
        Logger.log('Calendar named "%s" not found.', calendarName);
    }
}


/**
 * Google Documents
 */


function createDocument(title, content, emails, accessLevel) {
    try {
        let doc = DocumentApp.create(title);
        let docId = doc.getId();
        Logger.log('Document created with ID: ' + docId); addToLastRow('Document created with ID: ' + docId);
        let body = doc.getBody();
        body.setText(content);
        Logger.log('Document body set to ' + content); addToLastRow('Document body set to ' + content);
        let file = DriveApp.getFileById(docId);
        if (emails && accessLevel) {
            if (!Array.isArray(emails))
                emails = emails.split(',').map(email => email.trim());
            emails.forEach(function (email) {
                switch (accessLevel.toLowerCase()) {
                    case 'viewer':
                        file.addViewer(email);
                        break;
                    case 'commenter':
                        file.addCommenter(email);
                        break;
                    case 'editor':
                        file.addEditor(email);
                        break;
                    default:
                        addToLastRow('Invalid access level: ' + accessLevel + '. Must be "viewer", "commenter", or "editor".');
                        throw new Error('Invalid access level: ' + accessLevel + '. Must be "viewer", "commenter", or "editor".');
                }
                Logger.log('Document shared with: ' + email);
                addToLastRow('Document shared with: ' + email);
            });
        }
        let documentUrl = file.getUrl();
        Logger.log('Document URL: ' + documentUrl);
        addToLastRow('Document URL: ' + documentUrl);
        return documentUrl;
    } catch (err) {
        Logger.log('Failed with an error: ' + err.message);
        addToLastRow('Failed with an error: ' + err.message);
        return null;
    }
}


/**
 * Maps
 */


// share a direction
function shareGoogleMapsDirections(destination, userEmail, bodyContent = "") {
    let directionsURL = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(destination);

    let emailBody = "";
    if (bodyContent.trim() !== "") {
        emailBody += bodyContent + "\n\n";
    }
    emailBody += "Here are the directions to: " + destination + "\n" + directionsURL + "\n\n Have a safe journey!";

    try {
        GmailApp.sendEmail(userEmail, "Directions to Your Destination", emailBody);
        Logger.log("Directions sent to " + userEmail);
    } catch (e) {
        Logger.log("Failed to send directions email: " + e.message);
    }
}