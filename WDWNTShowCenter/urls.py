from django.conf.urls import include
from django.urls import path

from django.contrib import admin

admin.autodiscover()

import ShowCenter.urls
import ParksCenter.urls

# Examples:
# url(r'^$', 'WDWNTShowCenter.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    path('', include(ShowCenter.urls)),
    path('parkscenter/', include(ParksCenter.urls)),
    path('admin/', admin.site.urls),
]
