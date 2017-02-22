'use strict';

var EC = protractor.ExpectedConditions;
var lib = require('./lib');

describe('data management', function() {

  it('should preserve schema and document across route changes', function() {
    browser.get('#/version/draft-04/markup/json');

    var randomSchema = Math.random().toString(36).replace(/[^a-z]+/g, '');
    var randomDocument = Math.random().toString(36).replace(/[^a-z]+/g, '');

    // Reset
    element(by.buttonText("Reset")).click();

    // Type something RANDOM in schema and document
    var schemaElement = element(by.css("validator[identifier=schema] textarea"));
    schemaElement.clear();
    schemaElement.sendKeys(randomSchema);
    expect(schemaElement.getAttribute('value')).toEqual(randomSchema);
    var documentElement = element(by.css("validator[identifier=document] textarea"));
    documentElement.clear();
    documentElement.sendKeys(randomDocument);
    expect(documentElement.getAttribute('value')).toEqual(randomDocument);

    // Select a different version (use the button!)
    // Open the spec version menu
    element(by.css("#specVersionDropdown")).click();
    // SUSPICION - the samples menu displays outside angular's digest cycle.  So protractor doesn't really know if it's there
    browser.wait(EC.visibilityOf(element(by.css("ul[aria-labelledby=specVersionDropdown]"))), 250);
    // Select a different version
    element(by.linkText("draft-03")).click();
    browser.wait(lib.isDoneWorking, 2500);

    // Check the RANDOM stuff is still there
    expect(schemaElement.getAttribute('value')).toEqual(randomSchema);
    expect(documentElement.getAttribute('value')).toEqual(randomDocument);

  });

  it('should persist data across page reloads', function() {
    browser.get('#/version/draft-04/markup/json');

    var randomSchema = Math.random().toString(36).replace(/[^a-z]+/g, '');
    var randomDocument = Math.random().toString(36).replace(/[^a-z]+/g, '');

    // Reset
    element(by.buttonText("Reset")).click();

    // Type something RANDOM in schema and document
    var schemaElement = element(by.css("validator[identifier=schema] textarea"));
    schemaElement.clear();
    schemaElement.sendKeys(randomSchema);
    expect(schemaElement.getAttribute('value')).toEqual(randomSchema);
    var documentElement = element(by.css("validator[identifier=document] textarea"));
    documentElement.clear();
    documentElement.sendKeys(randomDocument);
    expect(documentElement.getAttribute('value')).toEqual(randomDocument);

    // Reload it
    browser.refresh();

    // Check the RANDOM stuff is still there
    schemaElement = element(by.css("validator[identifier=schema] textarea"));
    documentElement = element(by.css("validator[identifier=document] textarea"));
    expect(schemaElement.getAttribute('value')).toEqual(randomSchema);
    expect(documentElement.getAttribute('value')).toEqual(randomDocument);

  });

  describe('about dialog', function() {
    it('should display when the button is clicked', function() {
      browser.get('index.html');

      element(by.linkText("About")).click();

      expect(element(by.cssContainingText('h3', 'About')).isDisplayed()).toBeTruthy();
    });
  });

});