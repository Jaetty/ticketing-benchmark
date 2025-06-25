export type SeatStatus = "available" | "reserved" | "selected" | "unavailable";

export interface Seat {
  id: string;
  row: number;
  col: number;
  status: SeatStatus;
}