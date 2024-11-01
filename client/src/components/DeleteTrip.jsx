import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TRIP } from "../utils/mutations";
import { QUERY_USER_TRIPS } from "../utils/queries";

function DeleteTrip({ trip }) {
  const [deleteTrip] = useMutation(DELETE_TRIP, {
    variables: { tripId: trip._id },
    refetchQueries: [{ query: QUERY_USER_TRIPS }],
  });

  return (
    <>
      <button className="btn btn-secondary btn-sm" onClick={deleteTrip}>
        <FaTrash />
      </button>
    </>
  );
}

export default DeleteTrip;
