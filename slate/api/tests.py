# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

from tastypie.test import ResourceTestCaseMixin

from api.models import Task


class TaskResourceTest(ResourceTestCaseMixin, TestCase):
    def setUp(self):
        super(TaskResourceTest, self).setUp()

        self.task = Task.objects.create(name='Do Something')

    def test_get_tasks(self):
        self.assertHttpOK(self.__get('/tasks'))

    def test_get_task(self):
        self.assertHttpOK(self.__get('/tasks/1'))

    def test_post_task(self):
        self.assertHttpCreated(self.__post({ 'name': 'Test it right' }))

    def test_put_task(self):
        self.assertHttpAccepted(self.__put({ 'name': 'Do Other Thing' }))

    def test_delete_task(self):
        self.assertHttpAccepted(self.api_client.delete('/tasks/1'))

    def __get(self, url):
        return self.api_client.get(url)

    def __post(self, data):
        return self.api_client.post('/tasks', format='json', data=data)

    def __put(self, data):
        return self.api_client.put('/tasks/1', format='json', data=data)
