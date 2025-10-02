import { useContext, createContext, useState } from "react";
import type {CardProps} from "./Card";

interface IHand {
    wager: string,
    status: "playing" | "standing" | "busted",
    cards: Array<CardProps>
}

export interface IPlayers {
    playerId: string,
    name: string,
    bank: string,
    hand: IHand,
}

interface IDealer {
    cards: Array<CardProps>
}

export interface ITable {
    tableId?: string,
    hostId: string
    phase: "playing" | "ended" | "lobby",
    turn?: string,
    dealer?: IDealer,
    players?: Array<IPlayers>
}

interface TableContextType {
    tableState: ITable;
    setTableState: React.Dispatch<React.SetStateAction<ITable>>;
}


const TableContext = createContext<TableContextType | null>(null);

export const TableProvider = ({children} : any) => {
    const [tableState, setTableState] = useState<ITable>({hostId: "default", phase: "lobby"});
    

    return (
        <TableContext.Provider value={{tableState, setTableState}}>
            {children}
        </TableContext.Provider>
    );
}

export const useTable = () => {
    const ctx = useContext(TableContext);
    if (!ctx) {
        throw new Error("Provider is not there for Table");
    }
    return ctx;
}
