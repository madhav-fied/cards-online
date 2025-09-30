import type { CardProps } from "../components/Card";

// TODO: implemented this in server, so remove this
export const countHand = (cards: Array<CardProps>) => {
    // always returns max possible hand
    let sum = 0
    let aceCount = 0;
    cards.forEach((card) => {
        if (['K', 'J', 'Q'].includes(card.value)) sum += 10;
        else if (card.value == 'A') aceCount += 1;
        else sum += parseInt(card.value, 10);
    })
    
    if (aceCount == 0) return sum;
    
    let maxAceSum = 11 + aceCount - 1;
    let minAceSum = aceCount;
    if (maxAceSum + sum <= 21) return maxAceSum + sum;
    return minAceSum + sum;
}
