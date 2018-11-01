/**
 * Basic Sizes.
 */
let thisWidth = 640
let thisHeight = 480
if (typeof window !== `undefined`) {
  thisWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth

  thisHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
}
export const Width = thisWidth
export const Height = thisHeight

export const WrapperMaxWidthDesktop = 955
export const WrapperMaxWidthMobile = 414
export const WrapperMarginsMobile = 17

export const HeaderHeight = 104;
export const HeaderHeightMobile = 75;

export const DefaultMargin = 130
export const LargeMargin = 78
export const SmallMargin = 17
export const DefaultMarginAndFontSizeMobile = 39

/**
 * Base Colors.
 */
export const DarkBackground = '#00446f'
export const BtnLinkBackground = '#07d8ae'
export const DarkTextColor = '#bcd1de'
export const LightTextColor = '#656b6f'
export const DarkLinkHoverVisited = '#00f9c7'
export const DarkHeadingColor = '#bcd1de'
export const LightHeadingColor = '#00446f'

