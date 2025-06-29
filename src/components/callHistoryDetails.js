import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { API_BASE_URL } from "../envConst";

const CallHistoryDetails = ({ activeId }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (!activeId) return

    const apiPath = API_BASE_URL + 'summary' + activeId
    axios
      .get(apiPath, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MTE5NDAzN30.vgaSp1Ow0wFJy03m96yhdHO7VRgtq7gd_3KAbPPIb6w`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics data", err);
      });
  }, [activeId]);
  return (
    <Fragment>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white">
          <h6 className="mb-0">Call Summary Details</h6>
        </div>
        <div className="card-body">
          <p>{data?.summary_text}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default CallHistoryDetails;
