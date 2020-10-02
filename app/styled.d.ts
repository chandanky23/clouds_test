/** @example: https://medium.com/rbi-tech/theme-with-styled-components-and-typescript-209244ec15a3 */
import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryColor: string
      secondaryColor: string
      grayColor: string
      redColor: string
      greenColor: string
      orangeColor: string

      borderColor: string
      shadowColor: string

      disabledColor: string

      blackColor: string
      whiteColor: string
    }
  }
}
