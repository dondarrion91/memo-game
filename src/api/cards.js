import axios from "axios";

const endpoint = "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries";

export const getCards = async (quantity = 20) => {
  const res = await axios.get(`${endpoint}?per_page=${quantity}`);

  if (res.status === 200) return res.data;
};
