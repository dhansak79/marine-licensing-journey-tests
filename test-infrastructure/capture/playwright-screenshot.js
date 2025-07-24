import allureReporter from '@wdio/allure-reporter'

export const takePlaywrightScreenshot = async (page, name = 'Screenshot') => {
    const screenshot = await page.screenshot()
    await allureReporter.addAttachment(
        name,
        screenshot,
        'image/png'
    )
    return true
} 