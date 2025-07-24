import { faker } from '@faker-js/faker'

export default class MarineProjectModel {
  static PROJECT_NAME_MAX_LENGTH = 250

  static generateProjectName() {
    const activities = [
      'Wind Farm',
      'Cable Installation',
      'Marina Construction',
      'Offshore Platform',
      'Tidal Energy Array',
      'Subsea Pipeline',
      'Coastal Defence',
      'Port Development',
      'Breakwater Construction',
      'Floating Solar Farm',
      'Wave Energy Converter',
      'Aquaculture Farm',
      'Research Station',
      'Navigation Beacon',
      'Telecommunications Cable',
      'Geological Survey',
      'Environmental Monitoring',
      'Dredging Operation',
      'Pontoon Installation',
      'Seawall Reinforcement'
    ]
    const locations = [
      'Norfolk Coast',
      'Thames Estuary',
      'Bristol Channel',
      'Solent Waters',
      'Wash Estuary',
      'Humber Estuary',
      'Severn Estuary',
      'Morecambe Bay',
      'Cardigan Bay',
      'Liverpool Bay',
      'Outer Thames',
      'Dover Strait',
      'Yorkshire Coast',
      'Lincolnshire Waters',
      'Suffolk Coastal',
      'Devon Waters',
      'Cornwall Peninsula',
      'Isle of Wight',
      'Anglesey Waters',
      'Forth Estuary',
      'Tyne Estuary',
      'Mersey Estuary',
      'Blackwater Estuary',
      'Medway Waters',
      'Portsmouth Harbour'
    ]
    const descriptors = [
      'Development',
      'Extension',
      'Phase 1',
      'Phase 2',
      'Phase 3',
      'Expansion',
      'Upgrade',
      'Maintenance',
      'Decommissioning',
      'Pilot Project',
      'Trial Installation',
      'Emergency Repair',
      'Seasonal Works',
      'Environmental Study',
      'Feasibility Study',
      'Site Investigation',
      'Construction',
      'Installation',
      'Modernisation',
      'Refurbishment',
      'Relocation',
      'Temporary Works',
      'Permanent Installation',
      'Research Programme'
    ]

    const activity = faker.helpers.arrayElement(activities)
    const location = faker.helpers.arrayElement(locations)
    const descriptor = faker.helpers.arrayElement(descriptors)
    const randomNumber = faker.number.int({ min: 1000, max: 9999 })

    return `${location} ${activity} - ${descriptor} ${randomNumber}`
  }

  static generateOversizedProjectName() {
    return 'Construction of an Eco-Conscious Offshore Wind Farm Featuring Advanced Turbine Technology, Renewable Energy Integration Systems, and Marine Environmental Safeguards to Protect Biodiversity Across Coastal and Open Water Ecosystems While Promoting Sustainable Energy Solutions'
  }
}
