import { useContext, createContext, useState } from "react";
import type {CardProps} from "./Card";

interface IHand {
    wager: string,
    status: "playing" | "standing" | "busted" | "idle",
    cards: Array<CardProps>
}

interface IPlayers {
    playerId: string,
    name: string,
    bank: string,
    hand: IHand,
}

interface IDealer {
    cards: Array<CardProps>
}

export interface ITable {
    tableId: string,
    phase: "playing" | "ended" | "waiting",
    turn: string,
    dealer: IDealer,
    players: Array<IPlayers>
}

type TableContextType = {
    tableState: ITable | null,
    setTableState: any,
}

// @ts-ignore
const TableContext = createContext<TableContextType>(null);

export const TableProvider = ({children} : any) => {
    const [tableState, setTableState] = useState<ITable | null>(null);
    

    return (
        <TableContext.Provider value={{tableState, setTableState}}>
            {children}
        </TableContext.Provider>
    );
}

export const useTable = () => useContext(TableContext);