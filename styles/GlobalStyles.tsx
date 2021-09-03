import { Global, css } from '@emotion/react'
import { media, buttonStyle } from './mixins'
import { returnBreakpoint } from './breakpoints'

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          /* COLORS */
          --yellow: #e1bb34;
          --black: #000;
          --brown: #2b1e0a;
          --bg-color: #f6f8fa;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--yellow);
          --border-yellow: 1px solid var(--yellow);
          --border-light: 1px solid #dbdbdb;
          --golden-shadow: drop-shadow(0px 0px 20px var(--yellow));
          --ease: cubic-bezier(0.7, 0, 0.3, 1);

          /* FONTS */
          --font-a: 'Cinzel Decorative', cursive;;
          --font-b: 'runescapeFont', Courier, monospace;
          
          /* SPACING */
          --base-unit: 8px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: calc(var(--base-unit) * 1.5);
          --text-02: calc(var(--base-unit) * 2);
          --text-03: calc(var(--base-unit) * 3);
          --text-04: calc(var(--base-unit) * 4);
          --text-05: calc(var(--base-unit) * 5);

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc(var(--base-unit) * 10);
          --footer-height: calc(var(--base-unit) * 10);
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint('desktop')};
          --content-width-xl: ${returnBreakpoint('xl')};
        }

        /* MEDIA QUERY MIXIN */
        ${media.laptop`
          :root {
            --base-unit: 10px;
            --text-05: calc(var(--base-unit) * 6);
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 11px;
            --text-05: calc(var(--base-unit) * 7);
          }
        `}

        /* DEFAULTS */
        /* LAYOUT */
        body * {
          font-family: var(--font-a)!important;
        }

        main {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
          background: url('https://www.runescape.com/img/rs3/background-main-full-width.jpg') repeat-y 0 125px;
          background-size: 100%;
          background-position: 0 334px;
          &:after {
            content: '';
            display: block;
            left: 0;
            height: 52px;
            width: 100%;
            box-shadow: 0px -4px 15px #000;
            background: transparent url('https://www.runescape.com/img/rs3/large_break.jpg') repeat-x 0 0;
            clear: both;
          }
        }
        
        header {
          background: #071b25 url('https://www.runescape.com/img/rs3/background-main.jpg') repeat 0 0;
          z-index: 1000;
          &:before {
            content: '';
            background: transparent url('https://www.runescape.com/img/rs3/main_sprite2.png') no-repeat 0 -245px;
            width: 175px;
            height: 56px;
            position: absolute;
            z-index: 1;
            bottom: -20px;
            left: 0;
          }
          &:after {
            content: '';
            background: transparent url('https://www.runescape.com/img/rs3/main_sprite2.png') no-repeat 0 -245px;
            width: 175px;
            height: 56px;
            position: absolute;
            z-index: 1;
            bottom: -20px;
            right: 0;
            transform: scaleX(-1);
          }
        }

        header,
        footer {
          font-size: var(--text-02);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--space-md);
          a {
            text-decoration: none;
            color: var(--yellow);
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        /* TYPOGRPAHY */
        h1,h2,h3,h4,h5,h6 {
          font-weight: 500;
          color: var(--yellow);
        }
        h1 {
          font-size: var(--text-05);
          line-height: 1;
          text-align: center;
          padding: var(--space-md) 0 var(--space-lg);
        }
        h2 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        h3 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        a {
          font-weight: 400;
        }
        p,ol,ul {
          font-size: var(--text-02);
          padding-bottom: var(--space-sm);
          line-height: 1.35;
          font-weight: 400;
        }

        /* CUSTOM */
        .button {
          ${buttonStyle};
        }
        
        .zora-button {
          color: #000;
          width: 477px;
          height: 200px;
          text-align: center;
          background: url('https://www.runescape.com/img/rs3/../microsite/sprite.png') no-repeat -1924px 0;
          text-shadow: 1px 1px 2px #fff;
          font-family: "cinzel";
          font-weight: 600;
          font-size: var(--text-04)!important;
          padding: 18px 0 0;
          transform: scale(0.6);
          z-index: 50;
          background: url('https://www.runescape.com/img/rs3/../microsite/sprite-btn.png') no-repeat 0 0;
          height: 56px;
          margin: 0 auto!important;
        }

        /* ZORA SPECIFIC -- CLEAN UP
           - WALLET MODAL
        */
        .zora-wallet-modalContent {
          h3 {
            font-size: var(--text-03)!important;
            padding: 0 0 15px;
          }
          .zora--auction-house-modalSuccessMessage {
            font-size: var(--text-02)!important;
          }
          img {
            object-fit: contain;
          }
          p {
            font-size: var(--text-02)!important;
            padding: 0 0 10px;
            &:last-of-type {
              padding-bottom: 30px!important;
            }
          }
          .zora--auction-house-ethAmountLabel {
            padding-bottom: 15px;
            font-size: var(--text-02);
          }
          input {
            margin-bottom: 15px;
          }
          button.zora--auction-house-actionButton {
            ${buttonStyle};
            margin-bottom: 15px;
          }
        }
        .list-component-wrapper {
          background: var(--black);
          border-top: var(--yellow) 1px solid !important; //lol
        }

        footer {
          background: url(https://www.runescape.com/img/rs3/parchment.jpg);
          overflow: visible;
          flex-direction: column;
          padding-top: 40px;
          
          a {
            color: var(--brown);
          }
        }
        
        .zora-wallet-modalText {
          background: var(--black) !important;
        }
        .zora--auction-house-modalInner {
          background: var(--black) !important;
          color: var(--yellow) !important;
        }
        .zora-wallet-walletOptionsList {
          background: var(--black) !important;
          color: var(--yellow) !important;
        }
        .zora-wallet-walletOption {
          background: var(--yellow) !important;
        }
      `}
    />
  )
}
