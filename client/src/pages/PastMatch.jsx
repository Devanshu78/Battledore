import React, { useEffect } from "react";
import EventList from "../components/EventList";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function PastMatch() {
  const { getEvent, eventList, numberOfEvents } = useBackendService();
  dayjs.extend(customParseFormat);

  const oneMonthAgo = dayjs().subtract(1, "month").startOf("day");

  const pastEvents = eventList.filter((event) => {
    const eventStartingDate = dayjs(event.eventStart, "DD-MM-YYYY").startOf(
      "day"
    );
    return eventStartingDate.isBefore(oneMonthAgo);
  });

  useEffect(() => {
    getEvent();
  }, [numberOfEvents]);

  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Past Matches
      </h1>
      <hr />
      <div>
        {pastEvents?.map((event) => (
          <div key={event._id}>
            <EventList event={event} option={false} />
          </div>
        ))}
      </div>
    </>
  );
}

export default PastMatch;
