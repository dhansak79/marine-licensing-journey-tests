import EnterMultipleCoordinatesPage from '~/test-infrastructure/pages/enter.multiple.coordinates.page.js'

export default class EnterMultipleCoordinatesPageInteractions {
  static async enterPolygonCoordinates(
    browseTheWeb,
    siteDetails,
    useAddAnotherPoint = false
  ) {
    const { coordinateSystem, polygonData } = siteDetails

    if (!polygonData?.coordinates) {
      return
    }

    let coordinates
    if (useAddAnotherPoint) {
      coordinates = polygonData.coordinates
    } else {
      coordinates = polygonData.coordinates.slice(0, 3)
    }

    await this.enterCoordinatesWithAddAnotherPoint(
      browseTheWeb,
      coordinateSystem,
      coordinates,
      useAddAnotherPoint
    )
  }

  static async enterCoordinates(browseTheWeb, coordinateSystem, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      await this.enterSingleCoordinate(
        browseTheWeb,
        coordinateSystem,
        coordinates[i],
        i
      )
    }
  }

  static async enterCoordinatesWithAddAnotherPoint(
    browseTheWeb,
    coordinateSystem,
    coordinates,
    useAddAnotherPoint
  ) {
    await this.enterCoordinates(
      browseTheWeb,
      coordinateSystem,
      coordinates.slice(0, 3)
    )

    if (useAddAnotherPoint && coordinates.length > 3) {
      await this.addAdditionalCoordinates(
        browseTheWeb,
        coordinateSystem,
        coordinates.slice(3)
      )
    }
  }

  static async addAdditionalCoordinates(
    browseTheWeb,
    coordinateSystem,
    additionalCoordinates
  ) {
    for (let i = 0; i < additionalCoordinates.length; i++) {
      await browseTheWeb.click(
        EnterMultipleCoordinatesPage.addAnotherPointButton
      )
      await this.enterSingleCoordinate(
        browseTheWeb,
        coordinateSystem,
        additionalCoordinates[i],
        3 + i
      )
    }
  }

  static async enterSingleCoordinate(
    browseTheWeb,
    coordinateSystem,
    coordinate,
    coordinateIndex
  ) {
    const fieldMappings = {
      WGS84: [
        {
          value: coordinate.latitude,
          selector: EnterMultipleCoordinatesPage.latitudeInput(coordinateIndex)
        },
        {
          value: coordinate.longitude,
          selector: EnterMultipleCoordinatesPage.longitudeInput(coordinateIndex)
        }
      ],
      OSGB36: [
        {
          value: coordinate.eastings,
          selector: EnterMultipleCoordinatesPage.eastingsInput(coordinateIndex)
        },
        {
          value: coordinate.northings,
          selector: EnterMultipleCoordinatesPage.northingsInput(coordinateIndex)
        }
      ]
    }

    const fields = fieldMappings[coordinateSystem]
    for (const field of fields) {
      await this.enterCoordinateField(browseTheWeb, field.value, field.selector)
    }
  }

  static async enterCoordinateField(browseTheWeb, value, selector) {
    value && (await browseTheWeb.sendKeys(selector, value))
  }

  static async enterPolygonCoordinatesAndContinue(browseTheWeb, siteDetails) {
    await this.enterPolygonCoordinates(browseTheWeb, siteDetails)
    await browseTheWeb.click(EnterMultipleCoordinatesPage.continueButton)
  }
}
