from django.shortcuts import render
from django.http import HttpResponseNotFound
from django.views.generic import View


class FanlyFeudTemplateView(View):
    def get(self, request, template=None):
        if template is not None:
            return render(request, 'ff/'+template)
        else:
            return HttpResponseNotFound()

