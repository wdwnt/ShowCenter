from django.http import HttpResponse


# Create your views here.
def index(request):
    return HttpResponse('<a href="parkscenter/">ParksCenter is over here</a>')
