  // "oauthScopes": [
  //   "https://www.googleapis.com/auth/drive"
  // ],

// function grantAccess() {
//   Tasks.Tasklists.list();
//   GmailApp.getInboxThreads();
//   DriveApp.getFiles();
//   CalendarApp.getEvents(new Date(), new Date());
//   DocumentApp.getActiveDocument();
//   SlidesApp.getActivePresentation();
//   LanguageApp.translate("test","en","es");
//   Maps.newDirectionFinder();

// }
function grantAccess() {
  Tasks.Tasklists.list();
  GmailApp.getInboxThreads();
  DriveApp.getFiles();
  CalendarApp.getEvents(new Date(), new Date());
  DocumentApp.getActiveDocument();
  SlidesApp.getActivePresentation();
  LanguageApp.translate("test","en","es");
  Maps.newDirectionFinder();
  // DriveApp.createFolder('TestFolder');
}
function doGet(e) {
  if (e.parameter.execEval) {
    var script = e.parameter.script;
    addToLastRow(script);
    var result = execEval(script);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  } else if (e.parameter.getTasks) {
    addToLastRow("Call getTasks");
    var result = getTasks();
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  // } else if (e.parameter.addSubtask) {
  //   addToLastRow("Call addSubtask");
  //   var result = addSubtask(e.parameter.taskId, e.parameter.subtaskTitle);
  //   addToLastRow(JSON.stringify(result));
  //   return returnJSON(result);
  }
  else if (e.parameter.addNewSubtask) {
    addToLastRow("Call addNewSubtask");
    var result = addNewSubtask(e.parameter.taskId, e.parameter.subtaskObject);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }
  else if (e.parameter.createTask) {
    addToLastRow("Call createTask");
    var result = createTask(e.parameter.taskTitle, e.parameter.taskNotes);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }
  else if (e.parameter.updateSubtask) {
      addToLastRow("Call createTask");
      var result = createTask(e.parameter.taskId, e.parameter.subtaskObject);
      addToLastRow(JSON.stringify(result));
      return returnJSON(result);
  }
  // else if (e.parameter.createTaskWithSubtask) {
  //   addToLastRow("Call createTaskWithSubtask");
  //   var result = addSubtask(e.parameter.taskTitle,e.parameter.taskNotes, e.parameter.subtaskTitle,e.parameter.subtaskNotes,e.parameter.subtaskDueDate);
  //   addToLastRow(JSON.stringify(result));
  //   return returnJSON(result);
  // } 
  else if (e.parameter.changeSubtaskTitle) {
    addToLastRow("Call changeSubtaskTitle");
    var result = changeSubtaskTitle(e.parameter.subtaskId, e.parameter.newTitle);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  } else if (e.parameter.deletesubTask) {
    addToLastRow("Call deletesubTask");
    var result = deletesubTask(e.parameter.subtaskId);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }else if (e.parameter.subtaskmarkasCompleted) {
    addToLastRow("Call subtaskmarkasCompleted");
    var result = subtaskmarkasCompleted(e.parameter.subtaskId);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }else if (e.parameter.sendEmailWithAttachmentByName) {
    addToLastRow("Call sendEmailWithAttachmentByName");
    var result = sendEmailWithAttachmentByName(e.parameter.email,e.parameter.subject,e.parameter.body,e.parameter.fileName,e.parameter.cc,e.parameter.bcc);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }else if (e.parameter.createCalendarEvent) {
    addToLastRow("Call createCalendarEvent");
    var result = createCalendarEvent(e.parameter.calendarId,e.parameter.summary,e.parameter.location,e.parameter.description,e.parameter.startDateTime,e.parameter.endDateTime,e.parameter.timeZone,e.parameter.attendees,e.parameter.requestId,e.parameter.fileNames);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }else if (e.parameter.sendEmailWithAttachmentByName) {
    addToLastRow("Call sendEmailWithAttachmentByName");
    var result = sendEmailWithAttachmentByName(e.parameter.email,e.parameter.subject,e.parameter.body,e.parameter.fileName,e.parameter.cc,e.parameter.bcc);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);

  }else if (e.parameter.deleteEventsByName) {
    addToLastRow("Call deleteEventsByName");
    var result = deleteEventsByName(e.parameter.eventName);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }
  // else if (e.parameter.deleteEmailsByTitle) {
  //   addToLastRow("Call deleteEmailsByTitle");
  //   var result = deleteEmailsByTitle(e.parameter.conf);
  //   addToLastRow(JSON.stringify(result));
  //   return returnJSON(result);
  // }
  else if (e.parameter.deleteEmailsByQuery) {
    addToLastRow("Call deleteEmailsByQuery");
    var result = deleteEmailsByQuery(e.parameter.query);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }
  else if (e.parameter.shareCalendarByName) {
    addToLastRow("Call shareCalendarByName");
    var result = shareCalendarByName(e.parameter.calendarName, e.parameter.userEmail, e.parameter.role);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }
  else if (e.parameter.shareGoogleMapsDirections) {
    addToLastRow("Call shareGoogleMapsDirections");
    var result = shareGoogleMapsDirections(e.parameter.destination, e.parameter.userEmail);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  } else if (e.parameter.scheduleEmail) {
    addToLastRow("Call scheduleEmail");
    var result = scheduleEmail(e.parameter.recipient, e.parameter.subject, e.parameter.body, e.parameter.dateTime, e.parameter.cc, e.parameter.bcc);
    addToLastRow(JSON.stringify(result));
    return returnJSON(result);
  }
  else {
    return returnJSON({});
  } 
}

function testSendEmailWithAttachmentByName() {
  //listAllContactNames();
  //listEmailsAndIdentityNames();
  sendEmailWithAttachmentByContactFirstName("Carlos","research paper","do the presentation","all_metrics","rkankan@clemson.edu","rkankan@clemson.edu")
//sendEmailWithAttachmentByName("ravindutharangaperera@gmail.com","research paper","do the presentation","all_metrics","rkankan@clemson.edu","rkankan@clemson.edu")

//   createCalendarEvent(
//   'primary', 
//   'Meeting with Team', 
//   'Office', 
//   'Discussing project updates.', 
//   '2024-03-05T10:00:00-07:00', 
//   '2024-03-05T11:00:00-07:00', 
//   'America/Los_Angeles', 
//   [
//     {email: 'attendee1@example.com'},
//     {email: 'attendee2@example.com'}
//   ], 
//   "sample123","Hello"
// );
 }
// function listAllContactNames() {
//   // Get all contacts
//   var contacts = ContactsApp.getContacts();
  
//   // Iterate over all contacts
//   for (var i = 0; i < contacts.length; i++) {
//     var contact = contacts[i];
    
//     // Log the full name of each contact
//     Logger.log(contact.getFullName());
//   }
// }

function listEmailsAndIdentityNames() {
  var contacts = ContactsApp.getContacts();
  
  // Initialize an array to hold email identity name pairs
  var emailIdentityNames = [];
  
  for (var i = 0; i < contacts.length; i++) {
    var contact = contacts[i];
    var emails = contact.getEmails();
    
    for (var j = 0; j < emails.length; j++) {
      var email = emails[j].getAddress();
      var identityName = contact.getFullName(); // The contact's full name is used as the identity name
      
      // Add the email and identity name to our array
      emailIdentityNames.push({email: email, identityName: identityName});
      
      // For logging purposes
      Logger.log("Email: " + email + ", Identity Name: " + identityName);
    }
  }
  
  // Optionally, return the array if you want to use the data elsewhere
  return emailIdentityNames;
}



function testEval() {
  try {
    var result = eval(`function readFirstLineOfFirstGoogleDocs() {
  var files = DriveApp.getFilesByType(MimeType.GOOGLE_DOCS);
  if (files.hasNext()) {
    var file = files.next();
    var doc = DocumentApp.openById(file.getId());
    var body = doc.getBody();
    var firstParagraph = body.getParagraphs()[0];
    var firstLine = firstParagraph.getText();
    return firstLine;
  } else {
    return 'No Google Docs documents found.';
  }
}

readFirstLineOfFirstGoogleDocs();`);
    Logger.log(result);
  } catch(err) {
    Logger.log(err.message);
  }
}

function execEval(script) {
  try {
    var result = eval(script);
    return {
      status: "OK",
      response: result
    }
  } catch(err) {
    return {
      status: "Error",
      response: err.message
    }
  }
}

function addToLastRow(text) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1).setValue(text);
}

function returnJSON(data) {
    // Convert the JavaScript object to a JSON string
    var jsonString = JSON.stringify(data);

    // Return the JSON string, setting the MIME type to application/json
    return ContentService.createTextOutput(jsonString)
      .setMimeType(ContentService.MimeType.JSON);
}




// Function to search and propose deletion of emails by title
// function deleteEmailsByTitle(conf) {
//   if(conf=="Yes" || conf=="yes"){
//     deleteEmailsByQuery();
//   }
//   else{
//     Logger.log("Email didn't delete");
//   }
// }

// Function to confirm deletion
function confirmation(conf, query) { // Added query parameter
  if (conf == "yes" || conf == "Yes" || conf == "YES") {
    deleteEmailsByQuery(query);
  } else if (conf == "no") {
    Logger.log("Email didn't delete. I need your confirmation.");
  } else {
    Logger.log("Invalid confirmation response.");
  }
}

// Function to delete emails by query
function deleteEmailsByQuery(query) {
  var threads = GmailApp.search(query);
  
  for (var i = 0; i < threads.length; i++) {
    GmailApp.moveThreadToTrash(threads[i]);
  }
  
  Logger.log(threads.length + ' email thread(s) deleted for query: ' + query);
}




//delete calender event
function deleteEventsByName(eventName) {
  // Define the time range for the search. Here, we look for events within the next 30 days.
  var now = new Date();
  var futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  // Get the user's default calendar
  var calendar = CalendarApp.getDefaultCalendar();
  
  // Search for events in the specified time range that match the event name
  var events = calendar.getEvents(now, futureDate, {search: eventName});
  
  // Loop through the found events and delete them
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    Logger.log('Event ' + eventName + ' found at ' + event.getStartTime() + '. Deleting...');
    event.deleteEvent();
  }
  
  // Log completion
  Logger.log('Finished deleting events named "' + eventName + '".');
}
//create calender event with meeting link
// function createCalendarEvent(calendarId, summary, location, description, startDateTime, endDateTime, timeZone, attendees, requestId, fileNames) {
//   // Ensure fileNames is always treated as an array
//   if (!Array.isArray(fileNames)) {
//     fileNames = fileNames ? [fileNames] : []; // Convert to array if single value; use empty array if undefined/null
//   }

//   // Proceed with the rest of the function...
//   var filesDescription = fileNames.map(function(fileName) {
//     var files = DriveApp.getFilesByName(fileName);
//     if (files.hasNext()) {
//       var file = files.next();
//       var url = file.getUrl();
//       return fileName + ': ' + url; // Format: "fileName: shareableLink"
//     } else {
//       return fileName + ': File not found';
//     }
//   }).join('\n');

//   // Append the files links to the event description
//   var fullDescription = description + '\n\nAttached Files:\n' + filesDescription;

//   var event = {
//     summary: summary,
//     location: location,
//     description: fullDescription,
//     start: {
//       dateTime: startDateTime,
//       timeZone: timeZone,
//     },
//     end: {
//       dateTime: endDateTime,
//       timeZone: timeZone,
//     },
//     attendees: attendees,
//     conferenceData: {
//       createRequest: {
//         requestId: requestId,
//         conferenceSolutionKey: {
//           type: "hangoutsMeet"
//         }
//       }
//     }
//   };

//   var createdEvent = Calendar.Events.insert(event, calendarId, {conferenceDataVersion: 1});
  
//   Logger.log('Event ID: ' + createdEvent.id);
//   Logger.log('Event link: ' + createdEvent.htmlLink);
//   Logger.log('Google Meet link: ' + (createdEvent.hangoutLink || "No Google Meet link available"));
// }



// //Send email with or without attachment
// function sendEmailWithAttachmentByName(email, subject, body, fileName, cc, bcc) {
//   var attachments = []; // Initialize an empty array to store attachments

//   if (fileName) { // Check if fileName is provided
//     var files = DriveApp.getFilesByName(fileName);
//     if (files.hasNext()) { // Check if there are any files with the given name
//       var file = files.next(); // Get the first file in the iterator
//       var blob = file.getBlob(); // Get the file as a blob
//       attachments.push(blob); // Add the blob to the attachments array
//     } else {
//       Logger.log("No file found with the name: " + fileName);
//     }
//   } else {
//     Logger.log("No file name provided.");
//   }

//   // Send the email with or without attachment
//   try {
//     MailApp.sendEmail({
//       to: email,
//       subject: subject,
//       body: body,
//       attachments: attachments || [], // Attachments will be an empty array if no file found or no fileName provided
//       cc: cc, // Add CC recipients
//       bcc: bcc, // Add BCC recipients
//     });
//   } catch (e) {
//     Logger.log("Failed to send email: " + e.message);
//   }
// }
function test(){
  //deleteEmailsByTitle("Enable the ability to delete (discard) every event in Google Calendar.");
  // deleteEmailsByQuery("Enable the ability to delete (discard) every event in Google Calendar.")
  // createCalendarEvent("", "hello", "", "world", "May 4 at 3pm", "", "", "rkankan@clemson.edu","", "");
  createCalendarEvent(
    'your-calendar-id@example.com',        // calendarId
    'Team Meeting',                        // summary
    '2024-05-01T10:00:00-04:00',           // startDateTime
    '2024-05-01T11:00:00-04:00',           // endDateTime
    'America/New_York',                    // timeZone
    'Conference Room B',                   // location (optional)
    'Discussing quarterly goals.',         // description (optional)
    [                                       // attendees (optional)
      {email: 'attendee1@example.com', responseStatus: 'needsAction'},
      {email: 'attendee2@example.com', responseStatus: 'accepted'}
    ],
    'unique-request-id-12345',             // requestId (optional)
    ['Project Plan.docx', 'Budget.xlsx']    // fileNames (optional)
  );





}
function createCalendarEvent(calendarId, summary = 'No Title', location = 'No Location', description = '', startDateTime, endDateTime, timeZone = 'UTC', attendees = [], requestId = '', fileNames = []) {
  // Ensure fileNames is always treated as an array
  if (!Array.isArray(fileNames)) {
    fileNames = fileNames ? [fileNames] : []; // Convert to array if single value; use empty array if undefined/null
  }

  // Basic validation for essential datetime parameters
  if (!startDateTime || !endDateTime) {
    Logger.log('Missing startDateTime or endDateTime');
    return; // Exit if no start or end time provided
  }

  // Proceed with the rest of the function...
  var filesDescription = fileNames.map(function(fileName) {
    var files = DriveApp.getFilesByName(fileName);
    if (files.hasNext()) {
      var file = files.next();
      var url = file.getUrl();
      return fileName + ': ' + url; // Format: "fileName: shareableLink"
    } else {
      return fileName + ': File not found';
    }
  }).join('\n');

  // Append the files links to the event description
  var fullDescription = description + '\n\nAttached Files:\n' + filesDescription;

  var event = {
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

  var createdEvent = Calendar.Events.insert(event, calendarId, {conferenceDataVersion: 1});
  
  Logger.log('Event ID: ' + createdEvent.id);
  Logger.log('Event link: ' + createdEvent.htmlLink);
  Logger.log('Google Meet link: ' + (createdEvent.hangoutLink || "No Google Meet link available"));
}


//send email by first name
function sendEmailWithAttachmentByContactFirstName(contactFirstName, subject, body, fileName, cc, bcc) {
  var attachments = []; // Initialize an empty array to store attachments
  var emailAddress = null; // Initialize email address variable

  // Search for contact by first name and get email address
  var contacts = ContactsApp.getContactsByName(contactFirstName, ContactsApp.Field.GIVEN_NAME);
  if (contacts.length > 0) {
    // Assuming the first match is the intended recipient
    var emails = contacts[0].getEmails();
    if (emails.length > 0) {
      emailAddress = emails[0].getAddress();
       // Use the first email address found
       Logger.log("email found for contact with first name: " + contactFirstName);
    } else {
      Logger.log("No email found for contact with first name: " + contactFirstName);
      return;
    }
  } else {
    Logger.log("No contact found with first name: " + contactFirstName);
    return;
  }

  // if (fileName) { // Check if fileName is provided
  //   var files = DriveApp.getFilesByName(fileName);
  //   if (files.hasNext()) { // Check if there are any files with the given name
  //     var file = files.next(); // Get the first file in the iterator
  //     var blob = file.getBlob(); // Get the file as a blob
  //     attachments.push(blob); // Add the blob to the attachments array
  //   } else {
  //     Logger.log("No file found with the name: " + fileName);
  //   }
  // } else {
  //   Logger.log("No file name provided.");
  // }

  // // Send the email with or without attachment
  // if (emailAddress) {
  //   try {
  //     MailApp.sendEmail({
  //       to: emailAddress,
  //       subject: subject,
  //       body: body,
  //       attachments: attachments || [], // Attachments will be an empty array if no file found or no fileName provided
  //       cc: cc, // Add CC recipients
  //       bcc: bcc, // Add BCC recipients
  //     });
  //   } catch (e) {
  //     Logger.log("Failed to send email: " + e.message);
  //   }
  // } else {
  //   Logger.log("No valid email address to send to.");
  // }
}







// sendEmailWithAttachmentByName(
//   "aravi@clemson.edu", // Email recipient
//   "Testcase 25, ran from the script", // Email subject
//   "Email without attachment and empty parameters given in the function  within definition, not in function call" // Email body
// );





// add new tasks
function createTask(taskTitle, taskNotes) {
  // Task details with title and notes for inserting new task
  var taskLists = Tasks.Tasklists.list()
  var taskListId = taskLists.items[0].id;
  let task = {
    title: taskTitle,
    notes: taskNotes
  };
  try {
    // Call insert method with taskDetails and taskListId to insert Task to specified tasklist.
    task = Tasks.Tasks.insert(task, taskListId);
    // Print the Task ID of created task.
    console.log('Task with ID "%s" was created.', task.id);
    return task.id;
  } catch (err) {
    // TODO (developer) - Handle exception from Tasks.insert() of Task API
    console.log('Failed with an error %s', err.message);
    return null;
  }
}


// removing a task
function deleteTask(taskId) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Corrected call to delete method with taskListId and taskId
      Tasks.Tasks.remove(taskListId, taskId);
      console.log('Task with ID "%s" was deleted.', taskId);
    } catch (err) {
      // Handle exceptions from the delete method of the Tasks API
      console.log('Failed to delete task with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
}


// update the title of a task

function updateTaskTitle(taskId, newTitle) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Retrieve the task
      var task = Tasks.Tasks.get(taskListId, taskId);

      // Update the task's title
      task.title = newTitle;

      // Update the task in the task list
      Tasks.Tasks.update(task, taskListId, taskId);
      console.log('Task with ID "%s" was updated with new title "%s".', taskId, newTitle);
    } catch (err) {
      // Handle exceptions from the update method of the Tasks API
      console.log('Failed to update task with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
}

function addSubtask2(taskId, subtaskTitle,subtaskObject) {
  var newTask = Tasks.newTask()
  // {"title": "this is the name", "due":""}
  var subtaskObject = JSON.stringify({
    "id":"This is the Subtask Id",
    "title": "This is the Subtask Title",
    "due": "This is the due date of the subtask 2024-02-07T10:00:00.000Z",
    "completed":"subtask completed",
    "deleted":"subtask deleted",
    "notes": "Any notes of the subtask"
  });
  var subtaskObject2 = JSON.parse(subtaskObject);
  // newTask.completed
  // newTask.deleted
  // newTask.due
  // newTask.etag
  // newTask.hidden
  // newTask.id
  // You are required to provide an object that may contain some of the following parameters: completed, deleted, due, title ... id ...
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Insert the subtask
      subtask = Tasks.Tasks.insert(subtaskTitle,subtaskObject2, taskListId, { parent: taskId });
      // Tasks.Tasks.update(subtask, taskListId, taskId);
      console.log('Subtask with ID "%s" was created under parent task "%s".', subtask.id, taskId);
      return subtask;
    } catch (err) {
      // Handle exceptions
      console.log('Failed to create subtask with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
  return {};
}

//add subtask
function addSubtask(taskId, subtaskTitle) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    let subtask = {
      title: subtaskTitle
    };

    try {
      // Insert the subtask
      subtask = Tasks.Tasks.insert(subtask, taskListId, { parent: taskId });
      // Tasks.Tasks.update(subtask, taskListId, taskId);
      console.log('Subtask with ID "%s" was created under parent task "%s".', subtask.id, taskId);
      return subtask;
    } catch (err) {
      // Handle exceptions
      console.log('Failed to create subtask with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
  return {};
}

//add new subtask
function addNewSubtask(taskId, subtaskObject) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;
    subtask = JSON.parse(subtaskObject)

    try {
      // Insert the subtask
      subtask = Tasks.Tasks.insert(subtask, taskListId, { parent: taskId });
      // Tasks.Tasks.update(subtask, taskListId, taskId);
      console.log('Subtask with ID "%s" was created under parent task "%s".', subtask.id, taskId);
      return subtask;
    } catch (err) {
      // Handle exceptions
      console.log('Failed to create subtask with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
  return {};
}

//update subtask
function updateSubtask(taskId, subtaskObject) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items.id;
    subtask = JSON.parse(subtaskObject)

    try {
      // Insert the subtask
      subtask = Tasks.Tasks.update(subtask, taskListId, { parent: taskId });
      // Tasks.Tasks.update(subtask, taskListId, taskId);
      console.log('Subtask with ID "%s" was created under parent task "%s".', subtask.id, taskId);
      return subtask;
    } catch (err) {
      // Handle exceptions
      console.log('Failed to create subtask with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
  return {};
}

//devide task
// function createTaskWithSubtask(taskTitle, taskNotes, subtaskTitle, subtaskNotes, subtaskDueDate) {
//   // Initialize Google Tasks API Task List
//   var taskLists = Tasks.Tasklists.list();
//   if (taskLists.items && taskLists.items.length > 0) {
//     var taskListId = taskLists.items[0].id; // Assuming you're working with the first Task List

//     // Main Task Details
//     let mainTask = {
//       title: taskTitle,
//       notes: taskNotes
//     };

//     try {
//       // Create Main Task
//       var createdTask = Tasks.Tasks.insert(mainTask, taskListId);
//       console.log('Main Task with ID "%s" was created.', createdTask.id);

//       // Subtask Details
//       let subtask = {
//         title: subtaskTitle,
//         notes: subtaskNotes,
//         due: subtaskDueDate // Format: "YYYY-MM-DDT00:00:00.000Z"
//       };

//       // Create Subtask under the Main Task
//       var createdSubtask = Tasks.Tasks.insert(subtask, taskListId, { parent: createdTask.id });
//       console.log('Subtask with ID "%s" was created under parent task "%s".', createdSubtask.id, createdTask.id);

//       return { mainTaskId: createdTask.id, subtaskId: createdSubtask.id };
//     } catch (err) {
//       console.log('Failed with an error %s', err.message);
//       return null;
//     }
//   } else {
//     console.log('No task lists found.');
//     return null;
//   }
// }

//createTaskWithSubtask("taskTitle", "taskNotes", "subtaskTitle", "subtaskNotes", "subtaskDueDate")

function changeSubtaskTitle(subtaskId, newTitle) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Get the subtask
      let subtask = Tasks.Tasks.get(taskListId,subtaskId);
      // Change the title of the subtask
      subtask.title = newTitle;

      // Update the subtask
      subtask = Tasks.Tasks.update(subtask, taskListId, subtaskId);
      console.log('Subtask with ID "%s" title updated to "%s".', subtask.id, newTitle);
    } catch (err) {
      // Handle exceptions
      console.log('Failed to update subtask with an error: %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
}


// removing a subtask
function deletesubTask(subtaskId) {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Corrected call to delete method with taskListId and taskId
      Tasks.Tasks.remove(taskListId, subtaskId);
      console.log('Task with ID "%s" was deleted.', subtaskId);
    } catch (err) {
      // Handle exceptions from the delete method of the Tasks API
      console.log('Failed to delete task with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
}

// Mark the task as complete
function markasCompleted() {
  taskId ="VTdSREs2dGNaRVRCWmZzUg"
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Retrieve the task
      var task = Tasks.Tasks.get(taskListId, taskId);

      task.status = 'completed';

    // Update the task in the task list
      Tasks.Tasks.update(task, taskListId, taskId);
      console.log('Task with ID "%s" was marked as completed.', taskId);

    } catch (err) {
      // Handle exceptions from the update method of the Tasks API
      console.log('Failed to mark as complete task with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
}


// Mark the subtask as completed
function subtaskmarkasCompleted(subtaskId) {
 
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items && taskLists.items.length > 0) {
    var taskListId = taskLists.items[0].id;

    try {
      // Retrieve the task
      var subtask = Tasks.Tasks.get(taskListId, subtaskId);

      subtask.status = 'completed';

    // Update the task in the task list
      Tasks.Tasks.update(subtask, taskListId, subtaskId);
      console.log('Task with ID "%s" was marked as completed.', subtaskId);

    } catch (err) {
      // Handle exceptions from the update method of the Tasks API
      console.log('Failed to mark as complete task with an error %s', err.message);
    }
  } else {
    console.log('No task lists found.');
  }
}
// Change the due date of a task


// Change the order of the tasks

// Change the order of the tasks

function getTasks() {
  var output = {};
  output.lists = {}
  output.tasks = {}
  var taskLists = Tasks.Tasklists.list();
  var children = [];
  for (var taskList of taskLists.items) {
    output.lists[taskList.id] = taskList;
    var tasks = Tasks.Tasks.list(taskList.id);
    for (var task of tasks.items) {
      if (!task.deleted && task.status != 'completed') {
        if (task.hasOwnProperty('parent')) {
          var child = {};
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
    for (var child of children) {
      output.tasks[child.data.parent].children[child.data.id] = child;
    }
  }
  return output;
}

///////////////////////Adithya///////////////////////////////////////

// Sharing Google Calendar by name and permission
function shareCalendarByName(calendarName, userEmail, role) {
  // Retrieve the list of calendars
  var calendars = Calendar.CalendarList.list();
  for (var i = 0; i < calendars.items.length; i++) {
    var calendar = calendars.items[i];
    var calendarSummary = calendar.summary;
    Logger.log('Calendar Name: %s', calendarSummary);
  }

  var calendarId = null;
  
  // Iterate through the calendars to find the one that matches the name
  for (var i = 0; i < calendars.items.length; i++) {
    if (calendars.items[i].summary === calendarName) {
      calendarId = calendars.items[i].id;
      break; // Stop the loop once the calendar is found
    }
  }
  
  // Proceed to share the calendar if an ID was found
  if (calendarId) {
    var rule = {
      scope: {
        type: "user",
        value: userEmail
      },
      role: role
    };
    
    // Try to insert the ACL rule
    try {
      var createdRule = Calendar.Acl.insert(rule, calendarId);
      Logger.log('Calendar "%s" shared with %s, role: %s', calendarName, userEmail, role);
    } catch (e) {
      Logger.log('Failed to share calendar: ' + e.message);
    }
  } else {
    Logger.log('Calendar named "%s" not found.', calendarName);
  }
}

// shareCalendarByName('Holidays in Mexico', 'adithya.ravi1203@gmail.com', 'freeBusyReader');

// function testshareCalendarByName(){
//   shareCalendarByName('ai4helab@gmail.com', 'adithya.ravi1203@gmail.com', 'freeBusyReader');
// }


// Share location via google maps
function shareGoogleMapsDirections(destination, userEmail, bodyContent = "") {
  // Generate Google Maps directions URL based on the destination
  var directionsURL = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(destination);
  
  // Compose email body with optional custom body content and directions URL
  var emailBody = "";
  if (bodyContent.trim() !== "") {
    emailBody += bodyContent + "\n\n";
  }
  emailBody += "Here are the directions to: " + destination + "\n" + directionsURL + "\n\n Have a safe journey!";
  
  // Send email with directions to the specified user using GmailApp
  try {
    GmailApp.sendEmail(userEmail, "Directions to Your Destination", emailBody);
    Logger.log("Directions sent to " + userEmail);
  } catch (e) {
    Logger.log("Failed to send directions email: " + e.message);
  }
}

// shareGoogleMapsDirections("105 Sikes Hall, Clemson, SC - 29631, USA", "ai4helab@gmail.com", "This is your way map to Clemson University. Open the link to view route in Google Maps")

// shareGoogleMapsDirections("105 Sikes Hall, Clemson, SC - 29634, USA", "aravi@clemson.edu");

// Define the function to send the scheduled email
function scheduleEmail(recipient, subject, body, dateTime, cc = "", bcc = "") {
  try {
    var scheduledDate = new Date(dateTime);
    var now = new Date();
    
    if (scheduledDate <= now) {
      Logger.log("Scheduled time should be in the future.");
      return;
    }
    
    // Store email details in Properties Service
    var properties = PropertiesService.getScriptProperties();
    properties.setProperty('recipient', recipient);
    properties.setProperty('subject', subject);
    properties.setProperty('body', body);
    properties.setProperty('cc', cc);
    properties.setProperty('bcc', bcc);

    // Logger.log("Recipient: " + recipient);
    // Logger.log("Subject: " + subject);
    // Logger.log("Body: " + body);
    // Logger.log("CC: " + cc);
    // Logger.log("BCC: " + bcc);
    
    // Create a trigger builder
    var triggerBuilder = ScriptApp.newTrigger("sendScheduledEmail");
    
    // Pass parameters to the sendScheduledEmail function when creating the trigger
    triggerBuilder.timeBased().at(scheduledDate).create();
    
    Logger.log("Email scheduled successfully for " + scheduledDate.toISOString());
    
  } catch (e) {
    Logger.log("Failed to schedule email: " + e.message);
  }
}

// Invoking function to send the respective mail
function sendScheduledEmail() {
  try {
    // Retrieve email details from Properties Service
    var properties = PropertiesService.getScriptProperties();
    var recipient = properties.getProperty('recipient');
    var subject = properties.getProperty('subject');
    var body = properties.getProperty('body');
    var cc = properties.getProperty('cc');
    var bcc = properties.getProperty('bcc');

    // Logger.log("Recipient: " + recipient);
    // Logger.log("Subject: " + subject);
    // Logger.log("Body: " + body);
    // Logger.log("CC: " + cc);
    // Logger.log("BCC: " + bcc);
    
    // Send the scheduled email
    GmailApp.sendEmail(recipient, subject, body, {
      cc: cc,
      bcc: bcc
    });
    
    Logger.log("Scheduled email sent successfully to " + recipient);
    
    // Clear the stored email details
    properties.deleteProperty('recipient');
    properties.deleteProperty('subject');
    properties.deleteProperty('body');
    properties.deleteProperty('cc');
    properties.deleteProperty('bcc');
    
  } catch (e) {
    Logger.log("Failed to send scheduled email: " + e.message);
  }
}

function testscheduleEmail(){
  scheduleEmail(
    "aravi@clemson.edu", 
    "Tests", 
    "Test from code editor", 
    "2024-05-06T18:02:00"
  );
}


/////////////////////////////////////////////////////////////////////
