
export interface Player {
  id?: string;
  name: string;
}

export interface Team {
  id?: string;
  name: string;
}

export interface Event {
  id?: string;
  date: string;
  homeTeamId: string;
  homeTeamScore:number
  awayTeamId: string;
  awayTeamScore:number;
}

export interface EventPlayer {
  id?: string;
  eventId: string;
  playerId: string;
  hasYellowCard:boolean;
  hasRedCard:boolean;
  isDelegue:boolean;
  isCaptain:boolean;
  goals:number;
}
