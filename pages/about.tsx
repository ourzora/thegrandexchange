import Head from '../components/head'
import readMe from '../README.md'

import Markdown from '../components/Markdown'
import { PageWrapper } from '../styles/components'

export default function About() {
  return (
    <main>
      <Head title={'About'} />
      <PageWrapper>
        <Markdown markdown={readMe}/>
      </PageWrapper> 
    </main>
  )
}
