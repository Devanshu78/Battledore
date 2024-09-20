import React from "react";

function Courts() {
  const courts = [
    { id: 1, name: "silver", price: 50 },
    { id: 2, name: "gold", price: 80 },
    { id: 3, name: "premium", price: 150 },
  ];
  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Courts
      </h1>
      <hr />
      <div className="flex">
        {courts.map((court) => (
          <div
            key={court.id}
            className="mt-4 h-[75%] md:h-auto md:flex gap-10 md:justify-center overflow-y-auto"
          >
            <div className="rounded-3xl bg-[#7CB6CB] p-3 m-4 font-inter flex flex-col gap-4">
              <img
                className="rounded-3xl h-1/2"
                src={`../${court.name}.jpg`}
                alt={court.name}
              />
              <div className="flex flex-col px-4">
                <p className="font-medium text-3xl text-white">{court.name}</p>
                <p className="font-light text-xl opacity-70">
                  ${court.price} per/match
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Courts;
