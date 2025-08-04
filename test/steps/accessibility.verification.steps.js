import { Then } from '@cucumber/cucumber'
import { EnsurePageAccessibility } from '~/test-infrastructure/screenplay'

Then('the page passes basic accessibility checks', async function () {
  await this.actor.attemptsTo(EnsurePageAccessibility.passes())
})
