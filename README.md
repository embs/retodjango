[![Build Status][travis-badge]][travis]

# reTODjangO

A TODO lists app based on React and Django.

## Featuring

- [x] Add tasks
- [x] Remove tasks
- [ ] Handle back-end errors
- [ ] List's editable title
- [ ] Editable tasks
- [x] Mark task as done
- [ ] Assign task's due date
- [ ] Multiple lists
- [ ] User accounts
  - Sign up & in
- [ ] Password recovery
- [ ] Lists ownership
- [ ] Tasks assignment
- [ ] E-mail daily report
- [ ] Download daily report as PDF

## Development

### Project's Constituents

**Tutor**

Tutor is the front-end module for this app and lives in `tutor/` dir. More info
in its [README](./tutor/README.md).

**Slate**

Slate is a Django API which serves the purpose of our back-end. More info in the
[README](./slate/README.md).

**Pupil**

Integration tests for the whole app's apparatus. See
[README](./pupil/README.md).

**./docker/**

Facilities for using Docker.  See [README](./docker/README.md).

### Automated Tests Strategy

**Unit / Feature tests**

Provide faster feedback within development cycles and live inside components'
(tutor & slate) filesystem structures.

**Integration Tests**

Exercise end-to-end app's behavior and live inside `pupil` directory.

[travis]: https://travis-ci.org/embs/retodjango
[travis-badge]: https://travis-ci.org/embs/retodjango.svg?branch=master
