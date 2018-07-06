from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from api.models import Task


class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
        resource_name = 'tasks'
        authorization = Authorization()
