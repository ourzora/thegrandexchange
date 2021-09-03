import { css } from '@emotion/react'
import { returnBreakpoint } from './breakpoints'

export const media = {
  mobile: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('mobile')}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('tablet')}) {
      ${css(...args)}
    }
  `,
  laptop: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('laptop')}) {
      ${css(...args)}
    }
  `,
  desktop: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('desktop')}) {
      ${css(...args)}
    }
  `,
  xl: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('xl')}) {
      ${css(...args)}
    }
  `,
  hover: (...args: [TemplateStringsArray]) => css`
    @media (hover: hover) {
      &:hover {
        ${css(...args)}
      }
    }
  `,
  canHover: (...args: [TemplateStringsArray]) => css`
    @media (hover: hover) {
      ${css(...args)}
    }
  `,
  noHover: (...args: [TemplateStringsArray]) => css`
    @media (hover: none) {
      ${css(...args)}
    }
  `
}

export const absoluteCentered = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto!important;
`

export const absoluteFullCentered = css`
  width: 100%;
  height: 100%;
  ${absoluteCentered};
`

export const buttonInit = css`
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  -webkit-appearance: none;
  border: 0;
  background-color: rgba(255,255,255,0);
  text-decoration: none;
  cursor: pointer;
`

export const buttonStyle = css`
  ${buttonInit};
  border: var(--border-black);
  color: black!important;
  background-color: var(--yellow);
  margin: 0 auto;
  position: relative;
  display: block;
  padding: var(--base-unit) var(--space-md);
  font-size: var(--text-01);
  border-radius: 10px;
  text-align: center;
  border: 4px inset var(--yellow);
  ${media.hover`
    background-color: var(--yellow);
    color: var(--black);
  `}
`

export const pixelScaleImage = css`
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`

export const listGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-sm);
  justify-content: center;
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
  ${media.laptop`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  ${media.xl`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`

export const runeBorder = css`
  content: '';
  display: block;
  left: 0;
  right: 0;
  height: 52px;
  width: 100%;
  box-shadow: 0px -4px 15px #000;
  background: transparent url('https://www.runescape.com/img/rs3/large_break.jpg') repeat-x 0 0;
  clear: both;
`
