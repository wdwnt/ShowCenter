from django.contrib import admin

# Register your models here.
from ShowCenter import models

admin.site.register(models.TaskDescription)
admin.site.register(models.Task)
admin.site.register(models.Show)
admin.site.register(models.Episode)