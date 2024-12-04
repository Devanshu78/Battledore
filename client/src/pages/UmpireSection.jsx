import React, { useEffect } from "react";
import MatchList from "../components/MatchList";
import { useService } from "../ContextAPI/axios";

const UmpireSection = ({ matches }) => {
  const { getYourData, myData } = useService();
  useEffect(() => {
    getYourData();
  }, []);

  useEffect(() => {}, [myData]);

  function toSentenceCase(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div>
      <h1 className="text-5xl font-inter">
        Hello {toSentenceCase(myData?.username)}{" "}
      </h1>
      {matches?.map((matche, index) => (
        <MatchList match={matche} key={index} />
      ))}
    </div>
  );
};

export default UmpireSection;
