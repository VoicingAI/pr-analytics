import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../envConst";

const AnalyticsSummary = () => {
  const [data, setData] = useState({
    total_calls: 0,
    average_duration_seconds: 0,
    total_call_time_minutes: 0,
  });

  useEffect(() => {
    const apiPath = API_BASE_URL + '/metadata'
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
  }, []);

  const totalCallDurationSeconds = Math.round(
    data.total_call_time_minutes * 60
  );

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center py-4">
            <h2 className="text-primary font-weight-bold">
              {data.total_calls}
            </h2>
            <p className="mb-0 text-muted">Total Calls</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center py-4">
            <h2 className="text-primary font-weight-bold">
              {Math.round(data.average_duration_seconds)}
            </h2>
            <p className="mb-0 text-muted">Avg. Call Duration (sec)</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center py-4">
            <h2 className="text-primary font-weight-bold">
              {totalCallDurationSeconds}
            </h2>
            <p className="mb-0 text-muted">Total Call Duration (sec)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
