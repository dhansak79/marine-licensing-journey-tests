export default class HeaderPage {
  static locators = {
    serviceNavigation: 'nav',
    projectsHomeLink: '//a[normalize-space(text())="Projects"]',
    defraAccountLink: '//a[normalize-space(text())="Defra account"]',
    signOutLink: '//a[normalize-space(text())="Sign out"]'
  }
}
