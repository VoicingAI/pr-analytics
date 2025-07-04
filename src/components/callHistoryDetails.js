import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { API_BASE_URL } from "../envConst";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const CallHistoryDetails = ({ activeId }) => {

  const navigate = useNavigate()

  const TOKEN = localStorage?.getItem('token') || ''

  const [data, setData] = useState("");

  useEffect(() => {
    if (!activeId) return
    if (!TOKEN) return
    const apiPath = API_BASE_URL + '/analytics/summary/' + activeId
    axios
      .get(apiPath, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err?.status === 401) {
          navigate('/')
        }
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
