import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureCheckYourAnswersPage,
  EnsurePageHeading
} from '~/test-infrastructure/screenplay'

Given(
  'the user has completed all the tasks on the task list for a circular site using WGS84 coordinates',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    const exemptionFactory =
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    this.actor.intendsTo(exemptionFactory)
    await this.actor.attemptsTo(CompleteAllTasks.now())
  }
)

Given(
  'the user has completed all the tasks on the task list for a circular site using OSGB36 coordinates',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithOSGB36Coordinates()
    )
    await this.actor.attemptsTo(CompleteAllTasks.now())
  }
)

When('the user clicks Review and send', async function () {
  await this.actor.attemptsTo(ClickReviewAndSend.now())
})

Then(
  'the user is able to see all their answers in a summary format',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)
