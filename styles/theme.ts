import { css } from '@emotion/react'
import * as mixins from './mixins'

export const mediaConfigurationStyles = {
  theme: {
    linkColor: 'var(--yellow)',
    borderStyle: '1px solid var(--yellow)',
    /*
    lineSpacing: 20,
    defaultBorderRadius: 0,
    maximumPricingDecimals: 2,
    */
    cardOuter: () => css`
      color: var(--yellow);
    `,
  },
  styles: {
    cardAuctionPricing: () => css`
      font-family: var(--font-a)!important;
      text-transform: uppercase!important;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: var(--base-unit);
      border: var(--border-white);
      margin-top: var(--space-sm);
      padding: var(--base-unit);
      // border-radius: var(--base-unit);
      height: 70px;
      font-size: 18px;
    `,
    cardItemInfo: () => css`
      padding: var(--space-sm) var(--space-sm) 0;
      display: grid;
      grid-row-gap: 5px;
      font-size: var(--text-01);
      * {
        text-align: left;
        color: var(--white)!important;
        opacity: 1!important;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      ${mixins.media.laptop`
        justify-content: flex-end;
      `}
    `,
    cardOuter: () => css`
      width: 100%;
    `,
    cardMediaWrapper: () => css`
      width: 100%;
      position: relative;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      * {
        color: var(--white)!important;
      }
      img {
        ${mixins.absoluteFullCentered};
        object-fit: cover;
      }
    `,
    
    /*
    cardOuter: () => css`
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid var(--yellow);
      background-color: var(--black);
      margin: 15px;
      width: 330px;
      line-height: 24px;
      font-family: Inter,Helvetica;
      font-weight: 400;
      -webkit-transition: -webkit-transform 0.1s ease-in-out;
      transition: transform 0.1s ease-in-out;
      position: relative;
    `,
    cardAuctionPricing: () => css`
      color: var(--yellow);
      background: var(--black);
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto auto;
      grid-auto-column: 1fr;
      padding: 10px 15px;
      border-top: 1px solid var(--yellow);
    `,
    fullMediaWrapper: () => css`
      margin: 0;
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      img {
        object-fit: contain;
        ${mixins.absoluteFullCentered};
      }
      ${mixins.media.laptop`
        height: 50vh;
        min-height: 35rem;
        max-height: 65rem;
        padding-bottom: 0;
      `}
    `,
    mediaObject: () => css`
      z-index: 1;
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    `,
    */
    mediaLoader: () => css`
      ${mixins.absoluteFullCentered};
      z-index: 0;
    `,
    fullPageDataGrid: () => css`
      display: grid;
      grid-gap: var(--space-md);
    `,
    fullCreatorOwnerSection: () => css`
      padding: 0;
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto auto;
      padding: var(--base-unit);
      border: 1px solid var(--yellow);
      color: var(--yellow);
      * {
        text-align: center;
      }
    `,
    fullOwnerAddress: () => css`
      padding-top: var(--space-sm);
      font-size: var(--text-01);
    `,
    fullDescription: () => css`
      margin: var(--space-sm) 0;
      font-size: var(--text-02);
      line-height: 1.25;
      color: var(--yellow);
    `,
    fullTitle: () => css`
      font-size: var(--text-04);
      padding: var(--base-unit) 0;
    `,
    fullLabel: () => css`
      color: var(--yellow);
      font-family: var(--font-b)!important;
      text-transform: uppercase;
      font-size: var(--text-03);
    `,
    infoContainer: () => css`
      padding: var(--space-sm);
      border: 1px solid var(--yellow);
      margin: 0 auto var(--space-sm);
      color: var(--yellow);
      width: 100%;
    `,
    fullInfoProofAuthenticityContainer: () => css`
      padding: var(--space-sm) 0 0;
      display: grid;
      grid-template-columns: 1fr;
    `,
    fullPageHistoryTxnLink: () => css`
      font-size: var(--text-01);
      padding-top: 5px;
      color: var(--yellow);
    `,
    fullPageHistoryItemDatestamp: () => css`
      color: var(--yellow);
      font-size: var(--text-01);
      padding-top: 5px;
    `,
    fullPageHistoryItemMeta: () => css`
      padding-top: 10px;
    `,
    fullProofLink: () => css`
      ${mixins.buttonStyle};
      display: inline-block;
      padding: var(--base-unit);
      margin-bottom: var(--space-sm);
      font-size: var(--text-02);
    `,
    fullPageHistoryItem: () => css`
      margin: 0;
      padding: 0 0 5px;
      margin-bottom: var(--space-sm);
      font-size: var(--text-01);
      border-bottom: 1px dotted var(--yellow);
      &:last-of-type {
        border-bottom: 0;
      }
      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: 1px;
        font-size: var(--text-04);
        line-height: 1.2;
        * {
          margin: 0;
          text-align: center;
        }
        ${mixins.media.tablet`
          justify-content: space-between;
          flex-direction: row;
        `}
        ${mixins.media.laptop`
          font-size: var(--text-01);
        `}
      }
    `,
    fullInfoCreatorEquityContainer: () => css`
      margin: 0 0 var(--space-md);
    `,
    cardItemInfo: () => css`
      padding: var(--space-sm);
      display: flex;
      justify-content: center;
      font-size: 0.9em;
      * {
        text-align: center;
      }
      background: var(--black);
      color: var(--yellow);
    `,
    fullPageHistoryItemDescription: () => css`
      font-size: var(--text-01);
    `,
    cardMediaWrapper: () => css`
      width: 100%;
      position: relative;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      img {
        ${mixins.absoluteFullCentered};
        object-fit: cover;
      }
    `
  }
}
