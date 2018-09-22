from django.conf.urls import include, url
from django.urls import path, re_path

from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

import ShowCenter.views

from ParksCenter.views import ParksCenterTemplateView

# Examples:
# url(r'^$', 'WDWNTShowCenter.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', ShowCenter.views.index, name='index'),
    path('parkscenter/', TemplateView.as_view(template_name='ParksCenter/index.html')),
    path('admin/', admin.site.urls),
]
