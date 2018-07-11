FROM python:3.6.2-alpine

WORKDIR slate
RUN apk add --update gcc g++ make
RUN pip install pipenv
ADD slate/Pipfile Pipfile
RUN sed '/heroku/d' Pipfile > Pipfile.tmp && \
  mv Pipfile.tmp Pipfile
RUN pipenv install
ADD slate/manage.py .
ADD slate/api/ api/
ADD slate/slate/ slate/
RUN pipenv run python manage.py migrate
ENV GUNICORN_CMD_ARGS "--bind=0.0.0.0:8000 --worker-class gevent"

CMD ["pipenv", "run", "gunicorn", "slate.wsgi"]
