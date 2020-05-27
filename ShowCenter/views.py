from django.http import HttpResponse
from django.conf import settings


# Create your views here.
def index(request):
    STATIC_URL = settings.STATIC_URL
    resp = f'''
    <a href="{STATIC_URL}imgGen/index.html">Image generators</a>
        <br>
        <br>
        <a href="{STATIC_URL}parkscenter/index.html">ParksCenter</a>
        <br>
        <a href="{STATIC_URL}tts/index.html">Tony\s Town Squares</a>
        <br>
        <a href="ff/">Fanly Feud</a>
        <br>
        <a href="{STATIC_URL}dice/index.html">Tree of Dice</a>
        <br>
        <a href="{STATIC_URL}map_game/index.html">Map Game</a>
        <br>
        <a href="{STATIC_URL}match-game/index.html">Match Game</a>
        <br>
        <a href="{STATIC_URL}trivialpursuit/index.html">Parks Pursuit</a>
        <br>
        <a href="{STATIC_URL}jumblecruise/index.html">Jumble Cruise</a>
        <br>
        <a href="{STATIC_URL}jeopardy/index.html">Jeopardy</a>, and its 
        <a href="{STATIC_URL}jeopardy/host.html">Host Board</a>
        <br>
        <a href="{STATIC_URL}sale/index.html">Sale of the Pop Century</a>
         (and its <a href="{STATIC_URL}sale/index.html#!/cp">control panel</a>)
        <br>
        <a href="{STATIC_URL}toys/vmix.html">Toys for Tots HUD</a> 
        (and the <a href="{STATIC_URL}toys/index.html">embeddable version</a>)
        <br>
        <a href="{STATIC_URL}train/index.html">Train of Thought</a>
        <br>
        <a href="{STATIC_URL}whosequeue/index.html">Whose Queue Is It Anyway</a>
        <br>
        LEVELED: <a href="{STATIC_URL}leveled/4tier.html">4 tiers</a>, <a href="{STATIC_URL}leveled/5tier.html">5 tiers</a>
        <br>
        <br>
        One-off games:<br>
        <a href="{STATIC_URL}misc/IllumiNateTheTorches/index.html">IllumiNate The Torches</a>
    '''
    return HttpResponse(
        resp
        # '<a href="'+STATIC_URL+'imgGen/index.html">Image generators</a>'
        # '<br>'
        # '<br>'
        # '<a href="'+STATIC_URL+'parkscenter/index.html">ParksCenter</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'tts/index.html">Tony\'s Town Squares</a>'
        # '<br>'
        # '<a href="ff/">Fanly Feud</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'dice/index.html">Tree of Dice</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'map_game/index.html">Map Game</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'match-game/index.html">Match Game</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'trivialpursuit/index.html">Parks Pursuit</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'jumblecruise/index.html">Jumble Cruise</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'jeopardy/index.html">Jeopardy</a>, and its '
        # '<a href="'+STATIC_URL+'jeopardy/host.html">Host Board</a>'
        # '<br>'
        # '<a href="'+STATIC_URL+'sale/index.html">Sale of the Pop Century</a>'
        # ' (and its <a href="'+STATIC_URL+'sale/index.html#!/cp">control panel</a>)'
        # '<br>'
        # '<a href="'+STATIC_URL+'toys/vmix.html">Toys for Tots HUD</a> '
        # '(and the <a href="'+STATIC_URL+'toys/index.html">embeddable version</a>)'
        # '<br>'
        # '<a href="'+STATIC_URL+'train/index.html">Train of Thought</a>'
        # '<br>'
        # '<br>'
        # 'One-off games:<br>'
        # '<a href="'+STATIC_URL+'misc/IllumiNateTheTorches/index.html">IllumiNate The Torches</a>'
    )
