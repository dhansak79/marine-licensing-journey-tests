import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'
import { attachJson } from '~/test-infrastructure/capture/json.js'
import { expect } from 'chai'
import Task from '../base/task.js'

export default class EnsurePageAccessibility extends Task {
  static passes() {
    return new EnsurePageAccessibility()
  }

  async performAs() {
    const builder = new AxeBuilder({ client: browser })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('input[type="radio"][aria-expanded]')
    const result = await builder.analyze()
    const hasViolations = result.violations.length > 0
    if (hasViolations) {
      attachJson(result.violations, 'accessibility violations')
      expect.fail('Accessibility violations found')
    }
  }
}
