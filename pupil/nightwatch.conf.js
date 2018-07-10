module.exports = {
  src_folders: [ './' ],
  output_folder: 'reports',

  request_timeout_options: {
    timeout: 2000,
  },

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
    },
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: [
            'headless',
          ],
        }
      },
    },
  },
};
