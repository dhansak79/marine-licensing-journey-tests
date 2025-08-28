import allureReporter from '@wdio/allure-reporter'
import { browser } from '@wdio/globals'

export const takeScreenshot = async (name = 'Screenshot') => {
  const screenshot = await browser.takeScreenshot()
  await allureReporter.addAttachment(
    name,
    Buffer.from(screenshot, 'base64'),
    'image/png'
  )
  return true
}

/**
 * Enhanced screenshot function that includes URL and context information
 * @param {string} context - Context for when the screenshot was taken (e.g., 'failure', 'step', 'error')
 * @param {Error} error - Optional error object for failure screenshots
 * @returns {Promise<boolean>} - Success status
 */
export const takeEnhancedScreenshot = async (
  context = 'manual',
  error = null
) => {
  try {
    // Get current URL and page information
    const currentUrl = await browser.getUrl()
    const pageTitle = await browser.getTitle()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')

    // Create a descriptive name with URL information
    const urlSlug = currentUrl
      .replace(/^https?:\/\//, '') // Remove protocol
      .replace(/[^a-zA-Z0-9]/g, '-') // Replace special chars with dashes
      .substring(0, 50) // Limit length
    const screenshotName = `${context}_${urlSlug}_${timestamp}`

    // Take the screenshot
    const screenshot = await browser.takeScreenshot()

    // Log comprehensive information
    console.log(`[SCREENSHOT] 📸 ${context.toUpperCase()}`)
    console.log(`[SCREENSHOT] 📍 URL: ${currentUrl}`)
    console.log(`[SCREENSHOT] 📄 Title: ${pageTitle}`)

    if (error) {
      console.log(`[SCREENSHOT] ❌ Error: ${error.message}`)
      console.log(`[SCREENSHOT] 🔍 Error Type: ${error.constructor.name}`)
    }

    // Log browser console errors if any
    try {
      const logs = await browser.getLogs('browser')
      const errors = logs.filter((log) => log.level === 'SEVERE')
      if (errors.length > 0) {
        console.log(
          `[SCREENSHOT] 🚨 Browser Console Errors (${errors.length}):`
        )
        errors.slice(-3).forEach((err, index) => {
          // Last 3 errors
          console.log(`  ${index + 1}. ${err.message}`)
        })
      }
    } catch (logError) {
      console.log(
        `[SCREENSHOT] ⚠️ Could not retrieve browser logs: ${logError.message}`
      )
    }

    // Log network errors (performance logs)
    try {
      const performanceLogs = await browser.getLogs('performance')
      const failedRequests = performanceLogs
        .filter((log) => {
          try {
            const message = JSON.parse(log.message)
            return (
              message.message?.method === 'Network.responseReceived' &&
              message.message?.params?.response?.status >= 400
            )
          } catch {
            return false
          }
        })
        .slice(-3) // Last 3 failed requests

      if (failedRequests.length > 0) {
        console.log(`[SCREENSHOT] 🌐 Recent Failed Network Requests:`)
        failedRequests.forEach((req, index) => {
          try {
            const message = JSON.parse(req.message)
            const response = message.message.params.response
            console.log(`  ${index + 1}. ${response.status} ${response.url}`)
          } catch (parseError) {
            console.log(
              `  ${index + 1}. Could not parse network log: ${parseError.message}`
            )
          }
        })
      }
    } catch (perfError) {
      // Performance logs might not be available in all browser configurations
      console.log(
        `[SCREENSHOT] ⚠️ Could not retrieve performance logs: ${perfError.message}`
      )
    }

    // Attach to Allure with enhanced name
    await allureReporter.addAttachment(
      screenshotName,
      Buffer.from(screenshot, 'base64'),
      'image/png'
    )

    console.log(`[SCREENSHOT] ✅ Screenshot captured and attached to Allure`)
    return true
  } catch (screenshotError) {
    console.error(
      `[SCREENSHOT] ❌ Failed to take enhanced screenshot: ${screenshotError.message}`
    )
    // Fallback to basic screenshot
    try {
      await takeScreenshot(`fallback_${context}_${Date.now()}`)
      console.log(`[SCREENSHOT] ✅ Fallback screenshot taken`)
    } catch (fallbackError) {
      console.error(
        `[SCREENSHOT] ❌ Even fallback screenshot failed: ${fallbackError.message}`
      )
    }
    return false
  }
}

/**
 * Log current page information without taking screenshot
 * Useful for debugging navigation issues
 */
export const logCurrentPageInfo = async () => {
  try {
    const currentUrl = await browser.getUrl()
    const pageTitle = await browser.getTitle()
    const readyState = await browser.execute(() => document.readyState)

    console.log(`[PAGE-INFO] 📍 Current URL: ${currentUrl}`)
    console.log(`[PAGE-INFO] 📄 Page Title: ${pageTitle}`)
    console.log(`[PAGE-INFO] 📊 Ready State: ${readyState}`)

    // Check if page loaded successfully
    const hasBody = await browser.execute(() => !!document.body)
    console.log(`[PAGE-INFO] 📋 Has Body: ${hasBody}`)

    if (!hasBody) {
      console.log(
        `[PAGE-INFO] ⚠️ Page appears to have no body content - possible loading issue`
      )
    }

    // Check for common error indicators
    const errorElements = await browser.execute(() => {
      const errors = []
      // Check for error messages in common selectors
      const errorSelectors = [
        '[class*="error"]',
        '[id*="error"]',
        '.alert-danger',
        '.error-message'
      ]

      errorSelectors.forEach((selector) => {
        try {
          const elements = document.querySelectorAll(selector)
          if (elements.length > 0) {
            const text = Array.from(elements)
              .map((el) => el.textContent?.trim())
              .filter(Boolean)
              .join(' | ')
            errors.push(`${selector}: "${text}"`)
          }
        } catch (selectorError) {
          // Ignore invalid selectors - this is expected for some selectors
          console.log(
            `[PAGE-INFO] ⚠️ Invalid selector "${selector}": ${selectorError.message}`
          )
        }
      })

      return errors
    })

    if (errorElements.length > 0) {
      console.log(`[PAGE-INFO] 🚨 Potential Error Elements:`)
      errorElements.forEach((error) => console.log(`  • ${error}`))
    }
  } catch (error) {
    console.error(`[PAGE-INFO] ❌ Failed to log page info: ${error.message}`)
  }
}
