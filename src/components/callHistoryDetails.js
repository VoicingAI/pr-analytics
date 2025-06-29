import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { API_BASE_URL } from "../envConst";
import Markdown from "react-markdown";

const CallHistoryDetails = ({ activeId }) => {

  const TOKEN = localStorage?.getItem('token') || ''

  const [data, setData] = useState("");

  useEffect(() => {
    if (!activeId) return

    const apiPath = API_BASE_URL + '/analytics/summary/' + activeId
    axios
      .get(apiPath, {
        headers: {
          Authorization: `Bearer ${JSON.parse(TOKEN)}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics data", err);
      });
  }, [activeId, TOKEN]);

  return (
    <Fragment>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white">
          <h6 className="mb-0">Call Summary Details</h6>
        </div>
        <div className="card-body">
          <Markdown>{data?.summary_text}</Markdown>
        </div>
      </div>
    </Fragment>
  );
};

export default CallHistoryDetails;
