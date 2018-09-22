from django.db import models
from jsonfield import JSONField


class TaskDescription(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    options = JSONField()


class Task(models.Model):
    description = models.ForeignKey(TaskDescription, null=True, on_delete=models.SET_NULL)
    settings = JSONField()
    completed = models.BooleanField(default=False)


class Show(models.Model):
    name = models.CharField(max_length=255)
    tasks = models.ManyToManyField(Task)
    settings = JSONField()


class Episode(models.Model):
    name = models.CharField(max_length=255)
    show = models.ForeignKey(Show, null=True, on_delete=models.SET_NULL)
    tasks = models.ManyToManyField(Task)
    settings = JSONField()
