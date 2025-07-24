import { expect } from 'chai'
import D365Page from '~/test-infrastructure/pages/d365.page.js'
import Task from '../base/task.js'

export default class LoginToD365 extends Task {
  static now() {
    return new LoginToD365()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const credentials = this.getD365Credentials()

    await browseTheWeb.navigateTo(D365Page.getUrl(browseTheWeb.browser))

    await this.handleMicrosoftLogin(browseTheWeb, credentials)
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

  async handleMicrosoftLogin(browseTheWeb, credentials) {
    await browseTheWeb.setValue(D365Page.usernameField, credentials.userId)
    await browseTheWeb.click(D365Page.nextButton)

    await browseTheWeb.setValue(D365Page.passwordField, credentials.password)
    await browseTheWeb.click(D365Page.signInButton)

    await this.handleStaySignedInPrompt(browseTheWeb)
  }

  async handleStaySignedInPrompt(browseTheWeb) {
    try {
      await browseTheWeb.click(D365Page.staySignedInButton)
    } catch (error) {
      // Stay signed in prompt might not appear, continue
    }
  }
}
