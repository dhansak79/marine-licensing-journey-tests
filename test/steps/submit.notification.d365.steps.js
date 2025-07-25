import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseD365,
  BrowseTheWeb,
  ClickConfirmAndSend,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureThatTheExemptionDetailsAreCorrect,
  LoginToD365,
  RememberTheExemptionReferenceNumber,
  ViewSubmittedExemptionNotification
} from '~/test-infrastructure/screenplay'

Given('the user has submitted an exemption notification', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(CompleteAllTasks.now())
  await this.actor.attemptsTo(ClickReviewAndSend.now())
  await this.actor.attemptsTo(ClickConfirmAndSend.now())
  await this.actor.attemptsTo(RememberTheExemptionReferenceNumber.now())
})

When(
  'the internal user views the submitted exemption notification in D365',
  async function () {
    this.mmoUser = new Actor('Marcus')
    this.mmoUser.can(BrowseD365.withPlaywright())
    await this.mmoUser.attemptsTo(LoginToD365.now())
    const applicationReference = this.actor.recalls('applicationReference')
    await this.mmoUser.attemptsTo(
      ViewSubmittedExemptionNotification.forReference(applicationReference)
    )
  }
)

Then(
  'the exemption reference and project name are displayed in the case record',
  async function () {
    const completedExemptions = this.actor.recalls('completedExemptions')
    const exemption = completedExemptions[completedExemptions.length - 1]
    await this.mmoUser.attemptsTo(
      EnsureThatTheExemptionDetailsAreCorrect.forExemption(exemption)
    )
    const browseD365 = this.mmoUser.abilityTo('BrowseD365')
    await browseD365.close()
  }
)
