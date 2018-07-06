### Dependencies

- Python 3.6.2
- pipenv

### Setup

    $ pipenv install
    $ pipenv shell

### Start

    $ ./manage.py runserver

### Test

All

    $ ./manage.py test

Single class

    $ ./manage.py test api.tests.GetTasksTest

Single test case

    $ ./manage.py test api.tests.GetTasksTest.test_returns_ok
