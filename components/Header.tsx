import { css } from '@emotion/react'
import { NavLink } from './NavLink'
import { media } from '../styles/mixins'

export const Header = () => {
  return (
    <>
      <header css={css`
        height: var(--header-height);
        position: sticky;
        top: 0;
        z-index: var(--header-z);
        border-bottom: var(--border-black);
        background-color: var(--white);
      `}>
        <nav css={css`
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding-bottom: var(--space-sm);
          position: relative;
          ${media.laptop`
            padding-bottom: 5px;
          `}
        `}>
          <NavLink passHref href="/">
            <a>Auctions</a>
          </NavLink>
          <NavLink passHref href="/list">
            <a css={css`
              text-align: center;
            `}>List</a>
          </NavLink>
          <NavLink passHref href="/about">
            <a css={css`
              text-align: right;
            `}>About</a>
          </NavLink>
        </nav>
      </header>
    </>
  )
}
