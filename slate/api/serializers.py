import json

from django.core.serializers.json import DjangoJSONEncoder

from tastypie.serializers import Serializer


class CustomJSONSerializer(Serializer):
    def to_json(self, data, options=None):
        options = options or {}
        data = self.to_simple(data, options)

        if 'objects' in data:
            data = data['objects']

        return json.dumps(data)
