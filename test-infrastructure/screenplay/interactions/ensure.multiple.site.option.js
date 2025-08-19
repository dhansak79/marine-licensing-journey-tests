import DoYouNeedToTellUsAboutMoreThanOneSitePage from '~/test-infrastructure/pages/do.you.need.to.tell.us.about.more.than.one.site.page.js'
import Task from '../base/task.js'

export default class EnsureThatMultipleSiteOptionSelected extends Task {
  static is(expectedOption) {
    return new EnsureThatMultipleSiteOptionSelected(expectedOption)
  }

  constructor(expectedOption) {
    super()
    this.expectedOption = expectedOption
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isSelected(
      DoYouNeedToTellUsAboutMoreThanOneSitePage.getMoreThanOneSiteSelector(
        this.expectedOption
      )
    )
  }
}
