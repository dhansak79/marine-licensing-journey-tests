import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'

export default class ClickContinueLink extends Task {
  static forExemptionWithProjectName(projectName) {
    return new ClickContinueLink(projectName)
  }

  constructor(projectName) {
    super()
    this.projectName = projectName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(DashboardPage.continueLink(this.projectName))
  }
}
