import styled from "@emotion/styled";
import { FloorPrices, FloorInfo } from "../utils/loot_stats";

const StatsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StatContainer = styled.div`
  color: white;
  margin-right: 25px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const LastUpdatedContainer = styled.div`
  color: white;
  text-align: center;
  margin-bottom: 5px;
  font-size: 80%;
  font-style: italic;
`;

const FloorHeader = styled.div`
  color: white;
  text-align: center;
  margin-bottom: 10px;
  color: var(--yellow);
`;

const FloorPriceLink = styled.a`
  color: white;
  text-decoration: none;
`;

const LoadingOrErrorText = styled.div`
  color: white;
  text-align: center;
  flex-wrap: wrap;
  margin-bottom: 25px;
`;

const Stat = (props: { title: string; info: FloorInfo}) => {
  const { title, info } = props;
  return <StatContainer>
    {title}: <FloorPriceLink href={props.info.order.sale_link} target="_blank">{info.price} ETH</FloorPriceLink>
  </StatContainer>
}

export const Stats = (props: {
  prices: FloorPrices | undefined
  hasError: boolean
}) => {
  const { prices, hasError } = props;

  if (hasError) {
    return <LoadingOrErrorText>Error loading floor prices.</LoadingOrErrorText>;
  }
  if (!prices) {
    return <LoadingOrErrorText>Loading floor prices...</LoadingOrErrorText>;
  } else {
    const now = Date.now() / 1000;
    const lastUpdatedInSeconds = now - prices.updated_at;
    const lastUpdatedInMinutes = parseInt((lastUpdatedInSeconds/60).toString());
    const lastUpdatedText = lastUpdatedInMinutes == 0 ? 'moments ago' : `${lastUpdatedInMinutes} minute${lastUpdatedInMinutes > 1 ? 's' : ''} ago`;
    if (lastUpdatedInMinutes >= 60) {
      return <div/>;
    }
    return <>
      <FloorHeader>FLOORS</FloorHeader>
      <LastUpdatedContainer>Prices updated {lastUpdatedText}</LastUpdatedContainer>
      <StatsContainer>
        <Stat title='Floor' info={prices.floor}/>
        <Stat title='Divine Robe' info={prices.divine_robes}/>
        <Stat title='Ancient Helm' info={prices.ancient_helms}/>
        <Stat title='Katana' info={prices.katanas}/>
        <Stat title='Demon Crown' info={prices.demon}/>
      </StatsContainer>
    </>;
  }
}