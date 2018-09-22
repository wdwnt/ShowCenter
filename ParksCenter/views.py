from django.shortcuts import render
from django.http import HttpResponseNotFound
from django.views.generic import View


class ParksCenterTemplateView(View):
    def get(self, request, template=None):
        if template is not None:
            return render(request, 'ParksCenter/'+template)
        else:
            return HttpResponseNotFound()

