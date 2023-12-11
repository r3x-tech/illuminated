import { supabase } from "../supabaseClient";

export interface Score {
  user: string;
  score: number;
  walletAddress: string;
}

export const getLeaderboard = async (): Promise<Score[]> => {
  // Get all players, their scores and wallet addresses
  const { data, error } = await supabase
    .from("reload_meteor_smash_players")
    .select("username, saved_scores, wallet_address");

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data received from the database.");
  }

  // Flatten the data to create an array with all scores and their associated usernames and wallet addresses
  let allScores: Score[] = data.flatMap((player) => {
    if (!player.saved_scores) return [];
    return player.saved_scores.map((score: any) => ({
      user: player.username,
      score: score,
      walletAddress: player.wallet_address,
    }));
  });

  // Sort scores in descending order
  allScores.sort((a, b) => b.score - a.score);

  // Return only top 10 scores
  return allScores.slice(0, 10);
};
