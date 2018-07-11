module.exports = {
  src_folders: [ './' ],
  output_folder: 'reports',

  request_timeout_options: {
    timeout: 2000,
  },

  selenium: {
    start_process: false,
  },

  test_settings: {
    default: {
      selenium_host: 'localhost',
      selenium_port: 9515,
      default_path_prefix: '',

      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: [
            'headless',
            'no-sandbox',
            '--no-sandbox',
          ],
        }
      },
    },
  },
};
