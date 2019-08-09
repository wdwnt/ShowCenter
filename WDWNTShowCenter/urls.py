from django.conf.urls import include
from django.urls import path

from django.contrib import admin

import ShowCenter.urls
import FanlyFeud.urls

admin.autodiscover()

# Examples:
# url(r'^$', 'WDWNTShowCenter.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    path('', include(ShowCenter.urls)),
    path('ff/', include(FanlyFeud.urls)),
    path('admin/', admin.site.urls),
]
