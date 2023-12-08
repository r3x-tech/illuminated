import { Mystery } from "@/types/types";

export const mysteries: Mystery[] = [
  {
    title: "Mystery of the Vanishing Sculpture",
    description:
      "Inspired by the famous theft of the 'Bird in Space' sculpture by Constantin Brâncuși.",
    imageSrc: "/mystery_future.png",
    puzzles: [
      { name: "Feathered Shadow", status: "completed" },
      { name: "The Silent Witness", status: "uncompleted" },
      { name: "Echoes of the Past", status: "uncompleted" },
    ],
  },
  {
    title: "Secrets of the Sunken Ship",
    description:
      "A deep dive into the mystery of a sunken vessel lost in the Bermuda Triangle.",
    imageSrc: "/mystery_urban.png",
    puzzles: [
      { name: "Abyssal Secrets", status: "uncompleted" },
      { name: "Nautical Chronicles", status: "uncompleted" },
      { name: "Mariner's Misfortune", status: "completed" },
    ],
  },
  {
    title: "Enigma of the Forgotten Tomb",
    description:
      "An archaeological adventure to uncover the secrets of an ancient Egyptian tomb.",
    imageSrc: "/mystery_vintage.png",
    puzzles: [
      { name: "Hieroglyphic Riddles", status: "completed" },
      { name: "Sands of Time", status: "uncompleted" },
      { name: "Pharaoh's Curse", status: "uncompleted" },
    ],
  },
];
