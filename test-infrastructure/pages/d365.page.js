export default class D365Page {
  static getUrl(browser) {
    return browser.options.d365Url
  }

  // Login form selectors
  static usernameField = 'input[name="loginfmt"]'
  static passwordField = 'input[name="passwd"]'
  static nextButton = 'input[type="submit"][value="Next"]'
  static signInButton = 'input[type="submit"][value="Sign in"]'
  static staySignedInButton = 'input[type="submit"][value="Yes"]'

  // Case record field selectors
  static exemptionReferenceField = 'input[aria-label="Reference"]'
  static projectNameField = 'input[aria-label="Project Name"]'
  static typeField = 'input[aria-label="Type"]'
  static submittedDateField = 'input[aria-label="Date of Submitted Date"]'

  // Grid selectors
  static gridLinksSelector = '//div[@role="gridcell"]//a'
  static projectLinkSelector = (projectName) =>
    `//a[text()="${projectName}" and contains(@href, "entityrecord")]`

  static getCaseRecordLink(reference) {
    return `//*[@role="gridcell"][@col-id="ticketnumber"][.//label[@aria-label="${reference}"]]/ancestor::div[@role="row"]//a[contains(@href, "entityrecord")]`
  }
}
