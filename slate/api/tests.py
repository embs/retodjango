# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

from tastypie.test import ResourceTestCaseMixin

from api.models import Task


class TaskResourceTest(ResourceTestCaseMixin, TestCase):
    def setUp(self):
        super(TaskResourceTest, self).setUp()

        self.task = Task.objects.create(name='Do Something')

    def get(self, url, **kwargs):
        return self.api_client.get(url, **kwargs)

class GetTasksTest(TaskResourceTest):
    def setUp(self):
        super(GetTasksTest, self).setUp()

        self.response = self.get('/tasks')
        self.body = self.deserialize(self.response)

    def test_returns_ok(self):
        self.assertHttpOK(self.response)

    def test_returns_list(self):
        self.assertEqual(type(self.body), type([]))

    def test_returns_non_empty_list(self):
        self.assertEqual(1, len(self.body))

    def test_returns_existing_task(self):
        self.assertEqual(self.task.name, self.body[0]['name'])

class GetTaskTest(TaskResourceTest):
    def test_returns_ok(self):
        self.assertHttpOK(self.get('/tasks/1'))

class PostTaskTest(TaskResourceTest):
    def test_returns_created(self):
        self.assertHttpCreated(self.__post({ 'name': 'Test it right' }))

    def __post(self, data):
        return self.api_client.post('/tasks', format='json', data=data)

class PutTaskTest(TaskResourceTest):
    def test_returns_ok(self):
        self.assertHttpOK(self.__put({ 'name': 'Do Other Thing' }))

    def __put(self, data):
        return self.api_client.put('/tasks/1', format='json', data=data)

class DeleteTaskTest(TaskResourceTest):
    def test_returns_accepted(self):
        self.assertHttpAccepted(self.api_client.delete('/tasks/1'))

class CorsTest(TaskResourceTest):
    def setUp(self):
        super(CorsTest, self).setUp()

        self.headers = self.get('/tasks', HTTP_ORIGIN='somewhereelse')._headers

    def test_allows_cors(self):
        self.assertIn('access-control-allow-origin', self.headers)
