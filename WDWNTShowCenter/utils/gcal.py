from icalevents.icalevents import events

class GCal(object):
    def __init__(self):
        self.ics_url = 'https://calendar.google.com/calendar/ical/wdwnt.com' \
                       '_4ukclkbeeicaoj26l0n2ris2l4%40group.' \
                       'calendar.google.com/public/basic.ics'

    def get_events(self):
        # Note: will get the past week's events by default?
        es = events(self.ics_url)
        result = []
        for event in es:
            data = {
                'start': event.start,
                'end': event.end,
                'recurring': event.recurring,
                'title': event.summary
            }
            result.append(data)
        return result
