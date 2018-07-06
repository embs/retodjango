from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from api.models import Task
from api.serializers import CustomJSONSerializer


class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
        resource_name = 'tasks'
        authorization = Authorization()
        serializer = CustomJSONSerializer()
        always_return_data = True
