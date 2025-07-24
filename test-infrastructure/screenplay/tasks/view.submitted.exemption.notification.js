import D365Page from '../../pages/d365.page.js'
import Task from '../base/task.js'

export default class ViewSubmittedExemptionNotification extends Task {
  static forReference(exemptionReference) {
    return new ViewSubmittedExemptionNotification(exemptionReference)
  }

  constructor(exemptionReference) {
    super()
    this.exemptionReference = 'EXE/2025/10034'
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    if (!browseD365) {
      throw new Error(
        'Actor must have BrowseD365 ability to view D365 notifications'
      )
    }
    await this.findAndClickProjectLink(browseD365)
    await this.verifyReferenceField(browseD365)
  }

  async findAndClickProjectLink(browseD365) {
    const referenceSelector = D365Page.getCaseRecordLink(
      this.exemptionReference
    )
    await browseD365.clickElement(referenceSelector)
  }

  async verifyReferenceField(browseD365) {
    await browseD365.waitForElement(D365Page.exemptionReferenceField)
  }
}
