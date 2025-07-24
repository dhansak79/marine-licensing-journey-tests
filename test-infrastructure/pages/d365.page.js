export default class D365Page {
  static getUrl(browser) {
    return browser.options.d365Url
  }

  static usernameField = 'input[name="loginfmt"]'
  static passwordField = 'input[name="passwd"]'
  static nextButton = 'input[type="submit"][value="Next"]'
  static signInButton = 'input[type="submit"][value="Sign in"]'
  static staySignedInButton = 'input[type="submit"][value="Yes"]'
  static exemptionReferenceField = 'input[aria-label="Reference"]'
  static projectNameField = 'input[aria-label="Project Name"]'
  static typeField = 'input[aria-label="Type"]'
  static submittedDateField = 'input[aria-label="Date of Submitted Date"]'

  static getCaseRecordLink(reference) {
    // Find the gridcell containing the reference, then find the row and get the entityrecord link
    // Uses contains(., ...) to match all text content including child elements
    return `//*[@role="gridcell"][contains(., "${reference}")]/ancestor::div[@role="row"]//a[contains(@href, "entityrecord")]`
  }
}
