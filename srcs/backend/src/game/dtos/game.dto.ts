import { BallDto } from './ball.dto';
import { PlayerDto } from './player.dto';
import { Namespace } from 'socket.io';
import { BaseOutput } from 'src/common/dtos/base.dto';
import { History } from '../entities/history.entity';

export enum gameMod{
  normalGame,
  passwordGame,
  soloGame,
  rankGame,
}

export type FrontData = {
  leftPaddle : number,
  rightPaddle : number,
  ballX : number,
  ballY : number,
  leftScore: number,
  rightScore: number,
}

export type GameDto = {
  roomName: string,
  password: string,
  ball: BallDto,
  p1: PlayerDto,
  p2: PlayerDto,
  gameMod: gameMod,
  front: FrontData,
  p1Ready: boolean,
  p2Ready: boolean,
  nsp: Namespace,
  interval: NodeJS.Timer,
}

export class HistoryOutput extends BaseOutput {
	history?: History;
}
