import React from "react";

const BookingRequest = ({request,setRequest}) => {
  return (
    <>
      <div className="mb-6 bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Let us know if you have any request
        </h2>
        <p className="text-gray-500 mb-4">
          You will know the availability of your additional request during
          check-in. Extra charges may incur but you can still cancel your
          request later.
        </p>

        <div className="mt-4">
          <textarea
            name="others"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your request"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default BookingRequest;
