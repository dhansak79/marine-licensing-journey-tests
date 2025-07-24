import { expect } from 'chai'
import D365Page from '~/test-infrastructure/pages/d365.page.js'
import Task from '../base/task.js'

export default class ViewSubmittedExemptionNotification extends Task {
  static now(applicationReference) {
    return new ViewSubmittedExemptionNotification(applicationReference)
  }

  constructor(applicationReference) {
    super()
    this.applicationReference = applicationReference
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    if (!this.applicationReference) {
      expect.fail(
        'Application reference is required to view submitted exemption notification'
      )
    }

    await this.searchForCase(browseTheWeb)
    await this.openCaseRecord(browseTheWeb)
  }

  async searchForCase(browseTheWeb) {
    await browseTheWeb.waitForEnabled(D365Page.caseSearchInput)
    await browseTheWeb.setValue(
      D365Page.caseSearchInput,
      this.applicationReference
    )
    await browseTheWeb.pressKey('Enter')
  }

  async openCaseRecord(browseTheWeb) {
    await browseTheWeb.click(D365Page.caseRecordLink)
  }
}
