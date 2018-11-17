import argparse
from pprint import pprint

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


class YoutubeBroadcasts(object):
    def __init__(self, client_id, client_secret, refresh_token):
        self.client_id = client_id
        self.client_secret = client_secret
        self.refresh_token = refresh_token
        self.token_uri = 'https://www.googleapis.com/oauth2/v4/token'
        self.api_service_name = 'youtube'
        self.api_version = 'v3'
        self.service = self._get_authenticated_service()
        self.valid_statuses = ('active', 'upcoming',)

    def _get_authenticated_service(self):
        # Authorize the request and store authorization credentials.
        # For oAuth2, a Web Application client needs to be created
        # See https://google-auth.readthedocs.io/en/latest/reference/google.oauth2.credentials.html
        # A token is not required if there is a token_uri and refresh_token

        credentials = Credentials(None, client_id=self.client_id, client_secret=self.client_secret,
                                  token_uri=self.token_uri, refresh_token=self.refresh_token)
        return build(self.api_service_name, self.api_version, credentials=credentials)

    # Retrieve a list of broadcasts with the specified status.
    def list_broadcasts(self, broadcast_status='all'):
        # print('Broadcasts with status "{}":'.format(broadcast_status))

        list_broadcasts_request = self.service.liveBroadcasts().list(
            broadcastStatus=broadcast_status,
            part='id,snippet,contentDetails,status',
            maxResults=50
        )

        result = []
        while list_broadcasts_request:
            list_broadcasts_response = list_broadcasts_request.execute()

            for broadcast in list_broadcasts_response.get('items', []):
                # print('{} ({})'.format(broadcast['snippet']['title'], broadcast['id']))
                result.append(broadcast)

            list_broadcasts_request = self.service.liveBroadcasts().list_next(
                list_broadcasts_request, list_broadcasts_response)
        return result

    def get_broadcasts(self):
        all_broadcasts = []
        for status in self.valid_statuses:
            try:
                all_broadcasts.extend(self.list_broadcasts(status))
            except HttpError as e:
                print('An HTTP error {} occurred:\n{}'.format(e.resp.status, e.content))
        # Do some formatting stuff
        return all_broadcasts


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--client-id', help='oAuth Client ID')
    parser.add_argument('--client-secret', help='oAuth Client Secret')
    parser.add_argument('--refresh-token', help='oAuth Refresh Token')
    args = parser.parse_args()

    yb = YoutubeBroadcasts(args.client_id, args.client_secret, args.refresh_token)
    pprint(yb.get_broadcasts())
