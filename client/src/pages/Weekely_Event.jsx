import React, { useEffect } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";
import EventList from "../components/EventList";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";

function Weekely_Event() {
  const { getEvent, eventList, numberOfEvents } = useBackendService();
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(customParseFormat);

  const thisWeekEvents = eventList.filter((event) => {
    const eventStartDate = dayjs(event.eventStart, "DD-MM-YYYY");
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");

    return (
      eventStartDate.isSameOrAfter(startOfWeek) &&
      eventStartDate.isSameOrBefore(endOfWeek)
    );
  });

  useEffect(() => {
    getEvent();
  }, [numberOfEvents]);

  return (
    <>
      {thisWeekEvents?.map((event) => (
        <div key={event._id}>
          <EventList event={event} option={true} />
        </div>
      ))}
    </>
  );
}

export default Weekely_Event;
