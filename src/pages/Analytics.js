import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import AnalyticsSummary from "../components/analyticsCount";
import CallHistoryDetails from "../components/callHistoryDetails";
import { API_BASE_URL, FORMATTED_DATE_UI } from "../envConst";
import { useNavigate } from "react-router-dom";
import EmailListModal from "./EmailListModal";


export const SAMPLE_DATA = [
  {
    session_id: "session_abc123def456",
    full_transcript: [
      {
        role: "assistant",
        content:
          "Hello, I'm your AI Case Manager from the Exit Team and I'll be helping you with your exit process, is this a good time to talk?",
      },
      {
        role: "user",
        content:
          "Yes, this is a good time. I have some questions about my exit process.",
      },
      {
        role: "assistant",
        content:
          "Of course! I'd be happy to help you with your exit process. What specific questions do you have?",
      },
      {
        role: "user",
        content:
          "I want to know about the timeline for my exit and what documents I need to submit.",
      },
      {
        role: "assistant",
        content:
          "Great question! The typical exit process timeline is 2-3 weeks. You'll need to submit your resignation letter, complete the exit interview, and return any company property. Let me walk you through the specific steps...",
      },
    ],
    summary_text:
      "Customer inquired about exit process timeline and required documentation. Agent provided overview of 2-3 week timeline and listed required documents including resignation letter, exit interview, and company property return.",
    audio_blob_path: "accenture_recs/accenture_9876543210_20241215_143022.wav",
    audio_file_path:
      "https://storage.googleapis.com/your-bucket/accenture_recs/accenture_9876543210_20241215_143022.wav?X-Goog-Algorithm=ALGORITHM&X-Goog-Credential=...",
    start_timestamp: "2024-12-15T14:30:22",
    end_timestamp: "2024-12-15T14:35:45",
    unique_id: "550e8400-e29b-41d4-a716-446655440000",
    call_duration: 323.0,
    created_at: "2024-12-15T14:35:46.123456",
  },
  {
    session_id: "session_xyz789abc012",
    full_transcript: [
      {
        role: "assistant",
        content:
          "Hello, I'm your AI Case Manager from the Exit Team and I'll be helping you with your exit process, is this a good time to talk?",
      },
      {
        role: "user",
        content: "Hi, yes. I need help with my exit process.",
      },
      {
        role: "assistant",
        content:
          "I'm here to help! What specific aspect of your exit process would you like assistance with?",
      },
      {
        role: "user",
        content:
          "I'm not sure about the benefits I'm entitled to after leaving.",
      },
      {
        role: "assistant",
        content:
          "I understand your concern about benefits. Let me check your employment details and explain what benefits you're entitled to post-exit...",
      },
    ],
    summary_text:
      "Customer asked about post-exit benefits entitlement. Agent offered to check employment details and explain available benefits.",
    audio_blob_path: "accenture_recs/accenture_1234567890_20241215_140015.wav",
    audio_file_path:
      "https://storage.googleapis.com/your-bucket/accenture_recs/accenture_1234567890_20241215_140015.wav?X-Goog-Algorithm=ALGORITHM&X-Goog-Credential=...",
    start_timestamp: "2024-12-15T14:00:15",
    end_timestamp: "2024-12-15T14:08:32",
    unique_id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    call_duration: 497.0,
    created_at: "2024-12-15T14:08:33.456789",
  },
];

const AccentureAnalytics = () => {

  const navigate = useNavigate()

  const TOKEN = localStorage?.getItem('token') || ''

  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false)
  const [emailData, setEmailData] = useState('')
  const [mailModalIsOpen, setMailModalIsOpen] = useState(false)

  const handleGetTranscripts = () => {
    if (!TOKEN) return
    axios
      .get(`${API_BASE_URL}/analytics/data`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setData(res?.data?.data);
        }
      })
      .catch((err) => {
        if (err?.status === 401) {
          navigate('/')
        }
        console.error("Failed to fetch analytics data", err);

      });
  };

  const handleChangeId = (targetId) => {
    setActiveId(targetId);
  };

  const ACTIVE_SUMMARY_INFO = useMemo(() => {
    return data?.find((d) => d?.unique_id === activeId);
  }, [activeId]);

  const handleGenerateEmail = () => {
    if (!TOKEN) return
    setLoading(true)
    const apiPath = API_BASE_URL + '/analytics/mail/' + ACTIVE_SUMMARY_INFO?.unique_id
    axios.get(apiPath, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => {
      if (res?.status === 200) {
        alert("Email generated successfully")
        setEmailData(res?.data?.mail_text)
        setMailModalIsOpen(true)
      }
    }).catch((err) => {
      if (err?.status === 401) {
        navigate('/')
      }
      console.error("Failed to generate email: ", err)
    }).finally(() => setLoading(false))
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    handleGetTranscripts();
  }, [TOKEN]);

  useEffect(() => {
    if (!TOKEN) {
      navigate('/')
    }
  }, [TOKEN])

  console.log({ emailData })

  return (
    <Fragment>
      <div className="container">
        <div className="header-section bg-primary text-white py-4 px-3 rounded mb-4 shadow-sm mt-4">
          <div className="row align-items-center">
            <div className="col-md-9 text-center text-md-left">
              <h2 className="font-weight-bold mb-1 display-5">
                Accenture Analytics Dashboard
              </h2>
              <p className="lead mb-1">
                Call recordings and transcripts analysis
              </p>
              {/* <p className="text-light small mb-0 text-md-left text-center font-italic">
                Last Updated: 22 May 2025
              </p> */}
            </div>

            <div className="col-md-3 text-center text-md-right mt-3 mt-md-0">
              <div className="user-info mb-2">
                <span className="font-weight-light">
                  Welcome
                </span>
              </div>
              <button onClick={() => handleLogout()} className="btn btn-danger btn-sm text-white">
                Logout
              </button>
            </div>
          </div>
        </div>
        <AnalyticsSummary />
        <div className="mt-4">
          <div className="row">
            {/* Left: Call Transcripts */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Call Transcripts</h5>
                </div>
                <div className="card-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search by phone number or date..."
                  />

                  {/* Replace with dynamic map */}
                  {!!data &&
                    data.length > 0 &&
                    data.map((key, index) => (
                      <div
                        className="border rounded p-2 mb-2"
                        style={{ cursor: 'pointer' }}
                        key={index}
                        onClick={() => handleChangeId(key?.unique_id)}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge badge-success">
                            8799368044
                          </span>
                          <span className="badge badge-secondary">
                            {FORMATTED_DATE_UI(key?.created_at)}
                          </span>
                        </div>
                        <div className="small ">
                          {key?.audio_blob_path}
                          <br />
                          <span className="text-muted">{FORMATTED_DATE_UI(key?.end_timestamp)} -{" "}
                            {+key?.call_duration?.toFixed(2)} sec</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right: Call Details */}
            <div className="col-md-8" style={{ marginBottom: '50px' }}>
              <div className="card shadow-sm mb-4">
                <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                  <h5 className="mb-0">Call Details</h5>
                  <button className="btn btn-light btn-sm">Show Details</button>
                </div>
                <div className="card-body">
                  <h6 className="mb-2">8799368044</h6>
                  <p className="text-muted small">
                    {FORMATTED_DATE_UI(ACTIVE_SUMMARY_INFO?.created_at)}
                  </p>

                  <p className="mb-2 font-weight-bold">Recording:</p>
                  <audio
                    controls
                    className="w-100 mb-3"
                    src={ACTIVE_SUMMARY_INFO?.audio_file_path}
                  >
                    <source src="your-audio-url.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>

                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    <p className="font-weight-bold">Transcript:</p>

                    {!!ACTIVE_SUMMARY_INFO?.full_transcript &&
                      ACTIVE_SUMMARY_INFO?.full_transcript?.map((s) => {
                        return (
                          <Fragment>
                            {s?.role == "assistant" && (
                              <div className="p-3 mb-2 bg-light border-left border-success">
                                <strong>🤖 Assistant:</strong> {s?.content}
                              </div>
                            )}
                            {s?.role == "user" && (
                              <div className="p-3 bg-light border-left border-primary mb-2">
                                <strong>👤 User:</strong> {s?.content}
                              </div>
                            )}
                          </Fragment>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Call History Details */}
              {activeId &&
                <CallHistoryDetails activeId={activeId} />
              }
              {/* Send Email Section */}
              {ACTIVE_SUMMARY_INFO?.unique_id &&
                <div className="card shadow-sm" >
                  <div className="card-header bg-info text-white">
                    <h6 className="mb-0">Generate Email</h6>
                  </div>
                  <div className="card-body" >
                    <button style={{ marginBottom: '10px' }} type="submit" disabled={loading} className="btn btn-primary mt-2" onClick={handleGenerateEmail}>
                      {loading ? 'Generating...' : "Generate"}
                    </button>
                    {mailModalIsOpen &&
                      <>
                        <textarea className="w-100 form-control mb-2" style={{ minHeight: '200px' }} value={emailData} onChange={(e) => setEmailData(e.target.value)} />
                        <button className='btn btn-primary ' style={{ cursor: 'pointer' }} onClick={() => navigator?.clipboard?.writeText(emailData)}>Copy</button>
                      </>
                    }
                  </div>
                </div>
              }

            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default AccentureAnalytics;
