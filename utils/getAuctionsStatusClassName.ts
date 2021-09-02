export const getAuctionStatusClassName = (auctions: any) => {
  if (auctions.length) {
    const auction = auctions[0]
    // CHECK: Ended Date < Current Date
    const currentDate = new Date()
    const endedDate = auction.expiresAt !== null && new Date(auction.expiresAt)

    const unclaimed =
      endedDate !== false && endedDate.getTime() < currentDate.getTime()
      && auction.winner === null
    
    // CHECK: Has Auction Data
    const hasAuction = auction.bidEvents.length > 0 && auction.winner === null

    if (auction.bidEvents.length === 0) {
      return 'listed'
    } else if (hasAuction && !unclaimed) {
      return 'auction-live'
    } else if (hasAuction && unclaimed) {
      return 'unclaimed'
    } else if (auction.winner !== null && !unclaimed) {
      return 'ended'
    } else if (auction.status === "Finished") {
      return 'ended'
    }
  } else {
    return 'not-listed'
  }
}
