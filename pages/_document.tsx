import Document, { Html, Head, Main, NextScript } from 'next/document'

class CreateAuctionHouseDocument extends Document {
  render() {
    return (
      <>
        <script>{`/*
@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*              @@@@@@   
@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*           @@@@@@@@@   
        @@@@@@@   @@@@@@@        @@@@@@@        @@@@@         @@@@@@@@@@@   
      @@@@@@@    @@@@@@            @@@@@@     @@@@@@@      @@@@@@@@*@@@@@   
   @@@@@@*       @@@@@              @@@@@   @@@@@@@      @@@@@@@    @@@@@   
@@@@@@@*         @@@@@@            @@@@@@  @@@@@@     @@@@@@@@      @@@@@   
@@@@@@*           @@@@@@@        @@@@@@@    @@@@@@@ @@@@@@@         @@@@@   
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@           @@@@@   
  *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           @@@@@@**            @@@@@
        */`}</script>
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Open+Sans&display=swap" rel="stylesheet"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    )
  }
}

export default CreateAuctionHouseDocument
