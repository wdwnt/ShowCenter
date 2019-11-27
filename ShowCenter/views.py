from django.http import HttpResponse
from django.conf import settings

# Create your views here.
def index(request):
    STATIC_URL = settings.STATIC_URL
    return HttpResponse('<a href="'+STATIC_URL+'parkscenter/index.html">ParksCenter</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'tts/index.html">Tony\'s Town Squares</a>'
                        '<br>'
                        '<a href="ff/">Fanly Feud</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'dice/index.html">Tree of Dice</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'map_game/index.html">Map Game</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'match-game/index.html">Match Game</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'trivialpursuit/index.html">Parks Pursuit</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'jumblecruise/index.html">Jumble Cruise</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'jeopardy/index.html">Jeopardy</a>'
                        '<br>'
                        '<a href="'+STATIC_URL+'sale/index.html">Sale of the Pop Century</a>'
                        ' (and its <a href="'+STATIC_URL+'sale/index.html#!/cp">control panel</a>)'
                        '<a href="'+STATIC_URL+'jeopardy/host.html">Jeopardy Host Board</a>'
                        '<br>'
                         '<a href="'+STATIC_URL+'toys/index.html">Toys for Tots HUD</a>'
                        '<br>'
                        '<br>'
                        'One-off games:<br>'
                        '<a href="'+STATIC_URL+'misc/IllumiNateTheTorches/index.html">IllumiNate The Torches</a>'
                        '<br>')
