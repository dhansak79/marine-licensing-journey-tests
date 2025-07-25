import { expect } from 'chai'
import D365Page from '../../pages/d365.page.js'
import Task from '../base/task.js'

export default class LoginToD365 extends Task {
  static now() {
    return new LoginToD365()
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')

    if (!browseD365) {
      throw new Error('Actor must have BrowseD365 ability to login to D365')
    }

    const credentials = this.getD365Credentials()
    await browseD365.navigateToUrl(process.env.D365_URL)
    await this.handleMicrosoftLogin(browseD365, credentials)
  }

  getD365Credentials() {
    const userId = process.env.D365_USER_ID
    const password = process.env.D365_USER_PASSWORD

    if (!userId || !password) {
      expect.fail(
        'Missing D365_USER_ID or D365_USER_PASSWORD environment variables'
      )
    }

    return { userId, password }
  }

  async handleMicrosoftLogin(browseD365, credentials) {
    if (await browseD365.isElementVisible(D365Page.usernameField)) {
      await browseD365.fillField(D365Page.usernameField, credentials.userId)
      await browseD365.clickElement(D365Page.nextButton)
      await browseD365.fillField(D365Page.passwordField, credentials.password)
      await browseD365.clickElement(D365Page.signInButton)

      try {
        await browseD365.clickElement(D365Page.staySignedInButton)
      } catch (error) {
        console.log('Stay signed in dialog not found, continuing...')
      }
    }
  }
}
