export interface OwnedGame {
  gameId: string;
  gameModules: string[];
}

export type Puzzle = {
  name: string;
  status: "completed" | "uncompleted";
};

export type Mystery = {
  title: string;
  description: string;
  imageSrc: string;
  puzzles: Puzzle[];
};
