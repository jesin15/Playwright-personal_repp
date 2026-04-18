module.exports = {
  default: {
    // Tells Cucumber where the Gherkin files are
    paths: ['features/*.feature'], 
    // Tells Cucumber where the 'glue' code and hooks are
    require: ['features/step_definitions/*.js', 'features/support/*.js'], 
    format: ['progress-bar', 'html:cucumber-report.html']
  }
}