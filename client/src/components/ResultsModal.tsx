import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGame } from "./GameContext";
import { useSocket } from "../socketLib/socketContext";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useTable } from "./TableContext";


export interface IPlayerResult {
    playerName: string;
    playerId: string;
    status: "win" | "lost";
    oldBank: string;
    wager: string;
    newBank: string;
}

export interface IResultsProps {
    dealerValue: number;
    players: Array<IPlayerResult>;
}

const sxModal: any = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
}

export const ResultsModal = ({dealerValue, players}: IResultsProps) => {
    const {playerId, gameId} = useGame();
    const socket = useSocket();
    let navigate = useNavigate();
    const {setTableState} = useTable();

    const onGameExit = useCallback(() => {
        socket.timeout(5000).emit('remove_player', playerId, gameId, (err: any, res: any) => {
            if (err) {
                console.error(err);
                return;
            }
            
            if (res.type == "error") {
                throw new Error(res.message);
            }

            socket.disconnect();
            socket.connect();
            // TODO: default state for games??
            // NB: always set to phase lobby to make sure loading of init stages work fine
            setTableState({hostId: "default", phase: "lobby"});
            navigate("/")
        });
    }, [])

    const onGameRejoin = useCallback(() => {
        let player = players.filter((p) => p.playerId == playerId)[0];
        socket.timeout(5000).emit('rejoin_room', playerId, player.playerName, gameId, (err: any, res: any) => {
            if (err) {
                console.error(err);
                return;
            }
            
            if (res.type == "error") {
                throw new Error(res.message);
            }
            setTableState({hostId: "default", phase: "lobby"});
            navigate(`/lobby/${gameId}`)
        })
    }, [])



    return (
        <>
            <Modal open>
                <Box sx={sxModal}>
                    <Typography variant="h4">Game Over!</Typography>
                    <Typography variant="h6">Dealer value: {dealerValue}</Typography>
                    {
                        players.map((player) => {
                            return (
                                <Typography variant="subtitle1">
                                    {player.playerName}: {player.oldBank} to {player.newBank} ({player.status})
                                </Typography>
                            )
                        })
                    }
                    <Button variant="outlined" onClick={onGameExit}>Exit Game!</Button>
                    <Button variant="outlined" onClick={onGameRejoin}>Play Again</Button>
                </Box>
            </Modal>
        </>
    )
}