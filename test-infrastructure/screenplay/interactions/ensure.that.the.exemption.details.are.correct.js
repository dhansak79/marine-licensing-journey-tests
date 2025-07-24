import { expect } from 'chai'
import D365Page from '~/test-infrastructure/pages/d365.page.js'
import Task from '../base/task.js'

export default class EnsureThatTheExemptionDetailsAreCorrect extends Task {
    static forExemption(exemption) {
        return new EnsureThatTheExemptionDetailsAreCorrect(exemption)
    }

    constructor(exemption) {
        super()
        this.exemption = exemption
    }

    async performAs(actor) {
        const browseTheWeb = actor.ability

        if (!this.exemption) {
            expect.fail('Exemption data is required to verify details')
        }

        await browseTheWeb.expectElementToHaveValue(
            D365Page.exemptionReferenceField,
            this.exemption.applicationReference
        )

        await browseTheWeb.expectElementToHaveValue(
            D365Page.projectNameField,
            this.exemption.projectName
        )

        await browseTheWeb.expectElementToHaveValue(
            D365Page.typeField,
            'Exempt activity'
        )

        // Verify submitted date is today (DD/MM/YYYY format)
        const today = new Date().toLocaleDateString('en-GB')
        await browseTheWeb.expectElementToHaveValue(
            D365Page.submittedDateField,
            today
        )
    }
}
