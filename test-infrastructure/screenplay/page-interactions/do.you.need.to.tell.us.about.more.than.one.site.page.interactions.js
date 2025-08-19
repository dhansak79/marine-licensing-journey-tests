import DoYouNeedToTellUsAboutMoreThanOneSitePage from '~/test-infrastructure/pages/do.you.need.to.tell.us.about.more.than.one.site.page.js'

export default class DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions {
  static async selectNoAndContinue(browseTheWeb) {
    await browseTheWeb.click(DoYouNeedToTellUsAboutMoreThanOneSitePage.no)
    await browseTheWeb.click(
      DoYouNeedToTellUsAboutMoreThanOneSitePage.saveAndContinue
    )
  }

  static async selectMoreThanOneSiteAndContinue(browseTheWeb, moreThanOneSite) {
    const selector =
      DoYouNeedToTellUsAboutMoreThanOneSitePage.getMoreThanOneSiteSelector(
        moreThanOneSite
      )
    await browseTheWeb.click(selector)
    await browseTheWeb.click(
      DoYouNeedToTellUsAboutMoreThanOneSitePage.saveAndContinue
    )
  }
}
