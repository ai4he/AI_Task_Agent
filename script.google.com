{
  "openapi": "3.1.0",
  "info": {
    "title": "Execute Google Apps Script code",
    "description": "It works as an interface to execute any services on a Google Apps Script web endpoint.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://script.google.com/macros/s/AKfycbykGTuF8jTpW0yMxTDpItvKRmvMZnAYswv6t2kRShnf4bmVKkDwEG_0bGks291cnamC"
    }
  ],
  "paths": {
    "/exec?execEval=true&": {
      "get": {
        "description": "Executes the Google Apps Script code in the server",
        "operationId": "ExecuteGoogleAppsScript",
        "parameters": [
          {
            "name": "script",
            "in": "query",
            "description": "Provide all the code that wants to be executed in a Google Apps Script backend.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?createTask=true&": {
      "get": {
        "description": "This method retrieves all the tasks from Google Tasks",
        "operationId": "ExecuteCreateTasks",
        "parameters": [
          {
            "name": "taskTitle",
            "in": "query",
            "description": "This is the task title name.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "taskNotes",
            "in": "query",
            "description": "This is the notes of the task.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?addNewSubtask=true&": {
      "get": {
        "description": "This method adds a subtask by giving the Id of the parent task and a JSON representation of the task object required to create a new task in Google Apps Script.",
        "operationId": "ExecuteAddNewSubtask",
        "parameters": [
          {
            "name": "taskId",
            "in": "query",
            "description": "This is the parent task Id.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "subtaskObject",
            "in": "query",
            "description": "This is a JSON representation of the task object in Google Apps Script, you can find the reference in here https://developers.google.com/tasks/reference/rest/v1/tasks#Task. You do not need to include all the possible parameters, only the ones that you consider are needed. This is a list of possible parameters: kind,id,etag,title,updated,selfLink,parent,position,notes,status,due,completed,deleted,hidden,link.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?updateSubtask=true&": {
      "get": {
        "description": "This method update the subtask added by the user and it giving the Id of the parent task and a JSON representation of the task object required to update the subtask in Google Apps Script.",
        "operationId": "ExecuteUpdateSubtask",
        "parameters": [
          {
            "name": "taskId",
            "in": "query",
            "description": "This is the parent task Id.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "subtaskObject",
            "in": "query",
            "description": "This is a JSON representation of the task object in Google Apps Script, you can find the reference in here https://developers.google.com/tasks/reference/rest/v1/tasks#Task. You do not need to include all the possible parameters, only the ones that you consider are needed. This is a list of possible parameters: kind,id,etag,title,updated,selfLink,parent,position,notes,status,due,completed,deleted,hidden,link.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?changeSubtaskTitle=true&": {
      "get": {
        "description": "This method change the title of the subtask in Google Tasks",
        "operationId": "ExecuteChangeSubtasktitle",
        "parameters": [
          {
            "name": "subtaskId",
            "in": "query",
            "description": "This is the subtask Id.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "newTitle",
            "in": "query",
            "description": "This is the new title of the subtask.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?sendEmailWithAttachmentByName=true&": {
      "get": {
        "description": "This method sends an email with an attachment or without attachments from Google Drive based on the file name also it can add emails to CC and BCC",
        "operationId": "sendEmailWithAttachmentByName",
        "parameters": [
          {
            "name": "fileName",
            "in": "query",
            "description": "This is the name of the file in Google Drive.",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "cc",
            "in": "query",
            "description": "This is the CC of the email",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "bcc",
            "in": "query",
            "description": "This is the BCC of the email",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "email",
            "in": "query",
            "description": "This is the email domain of the receivers.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "subject",
            "in": "query",
            "description": "This is the subject of the email.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "body",
            "in": "query",
            "description": "This is the body of the email.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?createCalendarEvent=true&": {
      "get": {
        "description": "This method creates an event in Google calendar",
        "operationId": "CreateCalendarevent",
        "parameters": [
          {
            "name": "calendarId",
            "in": "query",
            "description": "This is the Id of the google calender event",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "summary",
            "in": "query",
            "description": "This is the Title of the google calender event",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "location",
            "in": "query",
            "description": "This is the location of the Google meeting host",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "description",
            "in": "query",
            "description": "This is the body of the Google Calendar",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDateTime",
            "in": "query",
            "description": "This is the start time in Google Calendar meeting",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "endDateTime",
            "in": "query",
            "description": "This is the end time of the Google Calendar meeting",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "timeZone",
            "in": "query",
            "description": "This is the timezone",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "attendees",
            "in": "query",
            "description": "This is the guest's email address",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "requestId",
            "in": "query",
            "description": "This is the request ID for the Google Calendar meeting",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "fileNames",
            "in": "query",
            "description": "This is the files attached from the Google Drive",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?deleteEventsByName=true&": {
      "get": {
        "description": "This method deletes the event in Gooogle Calender by searching it name",
        "operationId": "ExecuteDeleteSubtask",
        "parameters": [
          {
            "name": "eventName",
            "in": "query",
            "description": "This is the name of the event",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?scheduleEmail=true&": {
      "get": {
        "description": "Schedule an email to be sent at a specified date and time.",
        "operationId": "ExecuteScheduleEmail",
        "parameters": [
          {
            "name": "recipient",
            "in": "query",
            "description": "The email address of the recipient.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "subject",
            "in": "query",
            "description": "The subject of the email.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "body",
            "in": "query",
            "description": "The body of the email.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "dateTime",
            "in": "query",
            "description": "The date and time at which the email should be sent. Format: 'YYYY-MM DDTHH:MM:SSZ'.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "cc",
            "in": "query",
            "description": "The email addresses to be cc'ed.",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "bcc",
            "in": "query",
            "description": "The email addresses to be bcc'ed.",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?deletesubTask=true&": {
      "get": {
        "description": "This method remove the subtask in Google Tasks",
        "operationId": "ExecuteDeleteSubtask",
        "parameters": [
          {
            "name": "subtaskId",
            "in": "query",
            "description": "This is the subtask Id.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?deleteEmailsByQuery=true&": {
      "get": {
        "description": "This method deletes an email in Gmail by its title name after getting the positive confirmation from the user",
        "operationId": "ExecutedeleteEmailsByQuery",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "description": "This is the title or subject of the email",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    },
    "/exec?shareCalendarByName=true": {
      "get": {
        "description": "This method shares a Google Calendar with a specified user by calendar name and assigns a specific role to them. It searches for the calendar by name, and if found, shares it using the specified email and role.",
        "operationId": "ShareCalendarByName",
        "parameters": [
          {
            "name": "calendarName",
            "in": "query",
            "description": "The name of the Google Calendar to share. The function will search for a calendar with this name and share it if found.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "userEmail",
            "in": "query",
            "description": "The email address of the user with whom to share the calendar. The calendar will be shared with this user if it is found.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "role",
            "in": "query",
            "description": "The level of access to grant to the user for the calendar. Possible values include 'none', 'freeBusyReader', 'reader', 'writer', or 'owner'.",
            "required": true,
            "schema": {
              "type": "string",
              "enum": [
                "none",
                "freeBusyReader",
                "reader",
                "writer",
                "owner"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Calendar shared successfully. Returns details of the sharing rule created.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Calendar shared successfully."
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request. The request was invalid or cannot be served. Check the parameters.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "error"
                    },
                    "message": {
                      "type": "string",
                      "example": "Failed to share calendar: API call to calendar.acl.insert failed with error: Bad Request"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Calendar not found. No calendar matches the provided name.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "error"
                    },
                    "message": {
                      "type": "string",
                      "example": "Calendar named 'X' not found."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    },
    "/exec?shareGoogleMapsDirections=true": {
      "get": {
        "description": "This method generates directions on Google Maps based on the provided destination and sends them via email to the specified user.",
        "operationId": "ShareGoogleMapsDirections",
        "parameters": [
          {
            "name": "destination",
            "in": "query",
            "description": "The destination for which directions will be generated on Google Maps.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "userEmail",
            "in": "query",
            "description": "The email address of the user to whom the directions will be sent.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "email"
            }
          },
          {
            "name": "bodyContent",
            "in": "query",
            "description": "Optional custom body content to include in the email.",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Directions sent successfully. Returns details of the email sent.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Directions sent successfully."
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request. The request was invalid or cannot be served. Check the parameters.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "error"
                    },
                    "message": {
                      "type": "string",
                      "example": "Failed to send directions: Invalid destination provided."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    },
    "/exec?subtaskmarkasCompleted=true&": {
      "get": {
        "description": "This method mark the subtask as completed in Google Tasks",
        "operationId": "ExecuteSubtaskMarkascompleted",
        "parameters": [
          {
            "name": "subtaskId",
            "in": "query",
            "description": "This is the subtask Id.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
