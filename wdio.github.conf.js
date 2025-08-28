import fs from 'node:fs'
import {
  attachRichFeatureContext,
  logUserCleanup
} from './test-infrastructure/capture/index.js'

const getTags = () => {
  if (process.env.ENVIRONMENT === 'test') {
    return '@real-defra-id or @d365'
  }
  return 'not @wip and not @bug and not @local-only and not @d365 and not @real-defra-id'
}

export const config = {
  runner: 'local',
  baseUrl: `http://marine-licensing-frontend:3000/`,
  defraIdUrl: `http://localhost:3200`,
  hostname: process.env.CHROMEDRIVER_URL || '127.0.0.1',
  port: process.env.CHROMEDRIVER_PORT || 4444,

  specs: ['test/features/*.feature'],
  cucumberOpts: {
    require: ['test/steps/*.js'],
    tags: getTags(),
    timeout: 120000,
    backtrace: false
  },

  // ============================================================================
  // PARALLEL EXECUTION CONFIGURATION
  // ============================================================================
  // Number of instances to run in parallel
  // Start with 3-5 for local development, can go higher for CI
  // Each feature file will run in a separate worker process
  maxInstances: process.env.MAX_INSTANCES
    ? parseInt(process.env.MAX_INSTANCES)
    : 1,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--disable-infobars',
          '--headless',
          '--disable-gpu',
          '--window-size=1920,1080',
          '--enable-features=NetworkService,NetworkServiceInProcess',
          '--password-store=basic',
          '--use-mock-keychain',
          '--dns-prefetch-disable',
          '--disable-background-networking',
          '--disable-remote-fonts',
          '--ignore-certificate-errors',
          '--disable-dev-shm-usage'
        ]
      }
    }
  ],

  execArgv: ['--loader', 'esm-module-alias/loader'],

  logLevel: 'warn',

  // Number of failures before the test suite bails.
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',

  reporters: [
    [
      'spec',
      {
        addConsoleLogs: false,
        realtimeReporting: false,
        color: false
      }
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        issueLinkTemplate: 'https://eaflood.atlassian.net/browse/{}',
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: true,
        disableMochaArtifacts: true
      }
    ]
  ],
  beforeScenario: async function (world, context) {
    console.log(
      `[WDIO] beforeScenario: Starting scenario "${world.pickle.name}"`
    )
    console.log(
      `[WDIO] global.testUsersCreated before reload:`,
      global.testUsersCreated || []
    )

    await browser.reloadSession()
    attachRichFeatureContext(world)

    console.log(
      `[WDIO] global.testUsersCreated after reload:`,
      global.testUsersCreated || []
    )
  },
  afterStep: async function () {
    await browser.takeScreenshot()
  },
  afterScenario: async function (scenario, world) {
    if (scenario.result.status === 'FAILED') {
      await browser.takeScreenshot()
    }

    console.log(`[WDIO] afterScenario: Checking test users cleanup...`)
    console.log(`[WDIO] ENVIRONMENT: ${process.env.ENVIRONMENT}`)
    console.log(`[WDIO] DEFRA_ID_ENABLED: ${process.env.DEFRA_ID_ENABLED}`)
    console.log(
      `[WDIO] global.testUsersCreated exists: ${!!global.testUsersCreated}`
    )
    console.log(
      `[WDIO] global.testUsersCreated length: ${global.testUsersCreated?.length || 0}`
    )
    console.log(
      `[WDIO] global.testUsersCreated content:`,
      global.testUsersCreated || []
    )

    if (process.env.ENVIRONMENT !== 'test') {
      if (global.testUsersCreated && global.testUsersCreated.length > 0) {
        console.log(
          `[WDIO] Starting user cleanup for ${global.testUsersCreated.length} users...`
        )

        const { DefraIdStubUserManager } = await import(
          './test-infrastructure/helpers/defra-id-stub-user-manager.js'
        )
        const userManager = new DefraIdStubUserManager(config.defraIdUrl)

        for (const userId of global.testUsersCreated) {
          console.log(`[WDIO] Attempting to expire user: ${userId}`)
          try {
            await userManager.expireTestUser(userId)
            console.log(`[WDIO] Successfully expired user: ${userId}`)
            logUserCleanup(userId, true)
          } catch (error) {
            console.log(
              `[WDIO] Failed to expire user ${userId}:`,
              error.message
            )
            logUserCleanup(userId, false, error)
          }
        }

        console.log(
          `[WDIO] User cleanup completed, resetting global.testUsersCreated`
        )
        global.testUsersCreated = []
        console.log(
          `[WDIO] global.testUsersCreated reset to:`,
          global.testUsersCreated
        )
      } else {
        console.log(
          `[WDIO] No users to clean up (either array doesn't exist or is empty)`
        )
      }
    } else {
      console.log(`[WDIO] Skipping user cleanup because ENVIRONMENT is 'test'`)
    }
  },

  onComplete: function (exitCode, config, capabilities, results) {
    console.log(`[WDIO] onComplete: Test suite finished`)
    console.log(`[WDIO] Exit code: ${exitCode}`)
    console.log(
      `[WDIO] Final global.testUsersCreated state:`,
      global.testUsersCreated || []
    )
    console.log(
      `[WDIO] Test results:`,
      results
        ? `${results.passed || 0} passed, ${results.failed || 0} failed`
        : 'No results'
    )

    // !Do Not Remove! Required for test status to show correctly in portal.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}
