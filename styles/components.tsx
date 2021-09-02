import styled from '@emotion/styled'
import { absoluteFullCentered } from './mixins'

export const PageWrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: var(--content-width-md);
  position: relative;
  padding:
    var(--space-sm)
    var(--space-sm)
    var(--space-lg);

  //background-image: url(https://www.runescape.com/img/rs3/background-content-top.jpg);
  //background-repeat: repeat-x;
  //background-position: 0 334px;

`

export const ThumbnailImage = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  margin: 0 auto;
  overflow-y: visible;
  position: relative;
  img {
    ${absoluteFullCentered};
    object-fit: cover;
  }
`