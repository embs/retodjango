module.exports = {
  before : function(browser) {
    browser.url('http://localhost:3000');
  },

  'Create task' : function(browser) {
    const taskName = 'Do it';
    browser.setValue('.new-task__input', [taskName, browser.Keys.ENTER]);
    browser.waitForElementVisible('li', 1000);
    browser.expect.element('.task__name').value.to.equal(taskName);
  },

  'Mark task as done' : function(browser) {
    browser.click('.btn.btn-outline-secondary');
    browser.waitForElementPresent('.task__name--done', 1000);
  },

  'Delete task' : function(browser) {
    browser.click('.btn.btn-outline-danger');
    browser.waitForElementNotPresent('li', 1000);
  },
};
