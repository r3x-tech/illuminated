export const createGame = async (game: []) => {
  const response = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ game }),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create game. Error: ${errorMessage}`);
  }

  return await response.json();
};

export const createModule = async (module: []) => {
  const response = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ module }),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create module. Error: ${errorMessage}`);
  }

  return await response.json();
};
