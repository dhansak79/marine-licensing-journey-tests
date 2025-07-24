import D365Page from '../../pages/d365.page.js'
import Task from '../base/task.js'

export default class ViewSubmittedExemptionNotification extends Task {
  static forProject(projectName) {
    return new ViewSubmittedExemptionNotification(projectName)
  }

  constructor(projectName) {
    super()
    this.projectName = 'test'
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
    await browseD365.waitForElement(D365Page.gridLinksSelector, 180000)
    const projectSelector = D365Page.projectLinkSelector(this.projectName)
    await browseD365.waitForElement(projectSelector, 30000)
    await browseD365.clickElement(projectSelector)
    await browseD365.waitForLoadState()
  }

  async verifyReferenceField(browseD365) {
    await browseD365.waitForElement(D365Page.exemptionReferenceField, 30000)
  }
}
