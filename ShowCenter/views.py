from django.http import HttpResponse


# Create your views here.
def index(request):
    return HttpResponse('<a href="parkscenter/">ParksCenter is over here</a>'
                        '<br>'
                        '<a href="ff/">Fanly Feud is over here</a>')
