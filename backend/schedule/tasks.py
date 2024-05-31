from __future__ import print_function

import datetime
import os.path
from uuid import uuid4
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.events',
          'https://www.googleapis.com/auth/calendar']


user_json = {
        # add your user json here
    }

creds = Credentials.from_authorized_user_info(user_json, SCOPES)

service = build('calendar', 'v3', credentials=creds)


def create_event(description, start_datetime, end_datetime, attandees: list):
    attandees = [{'email': email} for email in attandees]
    event = {
        'summary': 'Lets connect',
        'location': 'Lets connect meet',
        'description': description,
        'start': {
            'dateTime': start_datetime,
            # 'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': end_datetime,
            # 'timeZone': 'America/Los_Angeles',
        },
        # 'recurrence': [
        #     'RRULE:FREQ=DAILY;COUNT=2'
        # ],
        'attendees': attandees,
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
        # "conferenceDataVersion": 1,
        "conferenceData": {
            "createRequest": {
                "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                },
                "requestId": uuid4().hex,
            }},

        "sendNotifications": True

    }

    # creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    event = service.events().insert(calendarId='primary', body=event,
                                    conferenceDataVersion=1, sendUpdates='all').execute()
    print('Event created: %s' % (event.get('htmlLink')))
    print(event['id'])
    return event['id']


def update_event(event_id,email):
    
    event = service.events().get(calendarId='primary',eventId=event_id).execute()
    attendees = event['attendees']
    attendees.append({'email':email})
    event['attendees'] = attendees
    updated_event = service.events().update(calendarId='primary',eventId=event_id,body=event).execute()



