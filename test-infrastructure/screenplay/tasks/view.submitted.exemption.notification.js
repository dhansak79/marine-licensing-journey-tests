import { expect } from 'chai'
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
    const browseTheWeb = actor.ability

    if (!this.projectName) {
      expect.fail(
        'Application reference is required to view submitted exemption notification'
      )
    }

    await this.findAndOpenCaseRecord(browseTheWeb)
  }

  async findAndOpenCaseRecord(browseTheWeb) {
    console.log('Waiting for D365 grid to load case data...')

    // Wait for the D365 grid to actually load data
    // The grid exists but is empty until data loads from the server
    const maxWaitTime = 60000 // 60 seconds
    const pollInterval = 2000 // Check every 2 seconds
    let elapsedTime = 0

    while (elapsedTime < maxWaitTime) {
      // Check if grid has loaded any case links
      const gridLinks = await browseTheWeb.browser.$$('//div[@role="gridcell"]//a')
      console.log(`Found ${gridLinks.length} case links after ${elapsedTime / 1000}s`)

      if (gridLinks.length > 0) {
        // Grid has data - look for test projects
        for (let i = 0; i < Math.min(gridLinks.length, 20); i++) {
          const text = await gridLinks[i].getText()
          const href = await gridLinks[i].getAttribute('href')

          if (text.toLowerCase().includes(this.projectName) && href && href.includes('entityrecord')) {
            console.log(`Clicking test project: "${text}"`)
            await gridLinks[i].click()
            return
          }
        }

        // Grid has data but no test projects found
        console.log('Grid has data but no test project links found')
        break
      }

      // Wait before next check
      await browseTheWeb.browser.pause(pollInterval)
      elapsedTime += pollInterval
    }

    throw new Error(`D365 grid did not load case data within ${maxWaitTime / 1000} seconds, or no test project links found`)
  }
}
