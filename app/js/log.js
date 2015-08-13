define([
  'log4javascript'
], function(l) {
  // create a new documents model
  var log = l.getLogger();
  var BrowserConsoleAppender = new l.BrowserConsoleAppender();
  var popUpLayout = new l.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
  BrowserConsoleAppender.setLayout(popUpLayout);
/*
log4javascript.Level.ALL
log4javascript.Level.TRACE
log4javascript.Level.DEBUG
log4javascript.Level.INFO
log4javascript.Level.WARN
log4javascript.Level.ERROR
log4javascript.Level.FATAL
log4javascript.Level.OFF
  BrowserConsoleAppender.setThreshold(l.Level.OFF);
  BrowserConsoleAppender.setThreshold(l.Level.ALL);
*/
  BrowserConsoleAppender.setThreshold(l.Level.ALL);
  log.addAppender(BrowserConsoleAppender);
  log.debug("Initialized log");

  // return the instantiated logger
  return log;

});
