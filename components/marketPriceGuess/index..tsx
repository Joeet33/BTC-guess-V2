import { useEffect, useState } from "react";
import { ListingProps } from "../interfaces/listingProps";
import { LatestPrice } from "../latestPrice";
import { Timer } from "../timer";
import { API } from "aws-amplify";
import {
  updateScore as updateScoreMutation,
  createScore as createScoreMutation,
} from "../../src/graphql/mutations.js";
import { listScores } from "../../src/graphql/queries.js";
import { ScoresProps } from "../interfaces/scoresProps";
import { withAuthenticator } from "@aws-amplify/ui-react";

const MarketPriceGuess = ({ user }: any) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [oldPrice, setOldPrice] = useState<ListingProps>();
  const [newPriceUp, setNewPriceUp] = useState<ListingProps>();
  const [newPriceDown, setNewPriceDown] = useState<ListingProps>();
  const [scoresData, setScoresData] = useState<ScoresProps[]>();
  const [id, setId] = useState<string>();
  const [scoreUp, setScoreUp] = useState<number>();
  const [scoreDown, setScoreDown] = useState<number>();

  const ownerScore =
    scoresData &&
    scoresData.map((scores: ScoresProps) => (
      <div key={scores.id}>
        {user.username === scores.owner ? <>Score: {scores.score}</> : null}
      </div>
    ));
  useEffect(() => {
    scoresData &&
      scoresData.map((scores: ScoresProps) => {
        user.username === scores.owner ? setScoreUp(scores.score + 1) : null;
        user.username === scores.owner ? setScoreDown(scores.score - 1) : null;
        user.username === scores.owner ? setId(scores.id) : null;
      });
  }, [scoresData]);

  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    const apiData: any = await API.graphql({ query: listScores });
    setScoresData(apiData.data.listScores.items);
  }

  async function createScore() {
    if (id == undefined) {
      await API.graphql({
        query: createScoreMutation,
        variables: {
          input: {
            score: 0,
            owner: user.username,
          },
        },
      });
    }
    fetchScores();
  }

  async function updateScoreWinning() {
    await API.graphql({
      query: updateScoreMutation,
      variables: {
        input: {
          id: id,
          score: scoreUp,
          owner: user.username,
        },
      },
    });
    fetchScores();
  }

  const updateScoreLosing = async () => {
    await API.graphql({
      query: updateScoreMutation,
      variables: {
        input: {
          id: id,
          score: scoreDown,
          owner: user.username,
        },
      },
    });
    fetchScores();
  };

  const resetScore = async () => {
    await API.graphql({
      query: updateScoreMutation,
      variables: {
        input: {
          id: id,
          score: 0,
          owner: user.username,
        },
      },
    });
    fetchScores();
  };

  const fetchPrice = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setOldPrice(res);
  };

  const fetchNewPriceUp = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setNewPriceUp(res);
  };

  const fetchNewPriceDown = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setNewPriceDown(res);
  };

  const handleOnClickUp = () => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 60000);
    setNewPriceUp(undefined);
    setNewPriceDown(undefined);
    fetchPrice();
    setTimeout(() => fetchNewPriceUp(), 60000);
    createScore();
  };

  const handleOnClickDown = () => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 60000);
    setNewPriceUp(undefined);
    setNewPriceDown(undefined);
    fetchPrice();
    setTimeout(() => fetchNewPriceDown(), 60000);
    createScore();
  };

  useEffect(() => {
    if (newPriceUp && newPriceUp && oldPrice && oldPrice) {
      if (newPriceUp.price > oldPrice.price) {
        updateScoreWinning();
      }

      if (newPriceUp.price < oldPrice.price) {
        updateScoreLosing();
      }
    }
  }, [newPriceUp]);

  useEffect(() => {
    if (newPriceDown && newPriceDown && oldPrice && oldPrice) {
      if (newPriceDown.price > oldPrice.price) {
        updateScoreLosing();
      }

      if (newPriceDown.price < oldPrice.price) {
        updateScoreWinning();
      }
    }
  }, [newPriceDown]);

  return (
    <div className="border border-solid border-black rounded p-8">
      <div className="flex flex-col justify-center font-bold pb-4">
        <div className="text-2xl mx-auto">Price Prediction</div>
        <Timer activate={isDisabled} />
      </div>
      <div className="flex flex-row font-bold">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <LatestPrice />
            <div>{id == undefined ? <div>Score: 0</div> : ownerScore}</div>
          </div>
          <div className="flex flex-col mt-auto">
            <div className="border border-solid border-black rounded p-2 my-2">
              Locked In BTC / USD:{" "}
              {oldPrice && Number(oldPrice.price).toFixed(2)}
            </div>
            <div className="border border-solid border-black rounded p-2">
              New Locked In BTC / USD:{" "}
              {newPriceUp && Number(newPriceUp.price).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="flex flex-col m-auto pl-40">
          <button
            disabled={isDisabled}
            className={
              isDisabled == true
                ? "w-24 h-24 -rotate-90 m-auto"
                : "w-24 h-24 -rotate-90 hover:scale-125 ease-in-out duration-300 m-auto"
            }
          >
            <img
              src="https://cdn.pixabay.com/photo/2017/05/11/12/24/green-2304007__480.png"
              alt=""
              onClick={handleOnClickUp}
            />
          </button>

          <button
            disabled={isDisabled}
            className={
              isDisabled == true
                ? "w-28 h-28 rotate-90 my-4"
                : "w-28 h-28 rotate-90 hover:scale-125 ease-in-out duration-300 my-4"
            }
          >
            <img
              src="https://png.monster/wp-content/uploads/2022/01/png.monster-173.png"
              alt=""
              onClick={handleOnClickDown}
            />
          </button>
          <button
            className="border border-solid border-black rounded"
            onClick={resetScore}
          >
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticator(MarketPriceGuess);
