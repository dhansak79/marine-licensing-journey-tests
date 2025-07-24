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

    await this.findAndOpenCaseRecord(browseTheWeb)
  }

  async findAndOpenCaseRecord(browseTheWeb) {
    // Hardcode reference for local testing as D365 integration is not live
    const hardCodedReference = 'EXE/2025/10028'

    // Construct the selector for the specific case record link
    const caseRecordSelector = D365Page.getCaseRecordLink(hardCodedReference)

    // Click on the case record link to navigate to the case details page
    await browseTheWeb.click(caseRecordSelector)
  }
}
