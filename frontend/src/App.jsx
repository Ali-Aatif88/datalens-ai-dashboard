import { useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [genericInsights, setGenericInsights] = useState(null);
  const [autoDashboard, setAutoDashboard] = useState(null);
  const [selectedAutoChart, setSelectedAutoChart] = useState(0);
  const [currentDatasetId, setCurrentDatasetId] = useState(null);

  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [genericSummary, setGenericSummary] = useState(null);
  const [genericChatQuestion, setGenericChatQuestion] = useState("");
  const [genericChatHistory, setGenericChatHistory] = useState([]);

  const [olistData, setOlistData] = useState(null);
  const [businessInsights, setBusinessInsights] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [executiveSummary, setExecutiveSummary] = useState(null);

  const [chatQuestion, setChatQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#84CC16"];

  const clearDashboard = () => {
    setFile(null);
    setUploadData(null);
    setProfileData(null);
    setGenericInsights(null);
    setAutoDashboard(null);
    setSelectedAutoChart(0);
    setCurrentDatasetId(null);
    setFilterColumn("");
    setFilterValue("");
    setGenericSummary(null);
    setGenericChatQuestion("");
    setGenericChatHistory([]);
    setOlistData(null);
    setBusinessInsights(null);
    setForecastData(null);
    setExecutiveSummary(null);
    setChatQuestion("");
    setChatHistory([]);
  };

  const fetchAutoDashboard = async (datasetId, column = "", value = "") => {
    let url = `http://127.0.0.1:8000/datasets/${datasetId}/auto-dashboard`;

    if (column && value) {
      url += `?filter_column=${encodeURIComponent(column)}&filter_value=${encodeURIComponent(value)}`;
    }

    const response = await axios.get(url);
    setAutoDashboard(response.data);
    setSelectedAutoChart(0);
  };

  const fetchGenericSummary = async (datasetId) => {
    const response = await axios.get(`http://127.0.0.1:8000/datasets/${datasetId}/executive-summary`);
    setGenericSummary(response.data);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a CSV file first");
      return;
    }

    try {
      setLoading(true);

      setOlistData(null);
      setBusinessInsights(null);
      setForecastData(null);
      setExecutiveSummary(null);
      setChatHistory([]);
      setGenericChatHistory([]);
      setGenericChatQuestion("");
      setGenericSummary(null);
      setSelectedAutoChart(0);
      setFilterColumn("");
      setFilterValue("");

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post("http://127.0.0.1:8000/upload-csv", formData);
      setUploadData(uploadResponse.data);

      const datasetId = uploadResponse.data.dataset_id;
      setCurrentDatasetId(datasetId);

      const profileResponse = await axios.get(`http://127.0.0.1:8000/datasets/${datasetId}/profile`);
      setProfileData(profileResponse.data);

      const insightsResponse = await axios.get(`http://127.0.0.1:8000/datasets/${datasetId}/insights`);
      setGenericInsights(insightsResponse.data);

      await fetchAutoDashboard(datasetId);
      await fetchGenericSummary(datasetId);

    } catch (error) {
      console.error(error);
      alert("CSV upload or profiling failed");
    }

    setLoading(false);
  };

  const applyGlobalFilter = async () => {
    if (!currentDatasetId) {
      alert("Please upload a dataset first");
      return;
    }

    if (!filterColumn || !filterValue) {
      alert("Please select both filter column and filter value");
      return;
    }

    try {
      setLoading(true);
      await fetchAutoDashboard(currentDatasetId, filterColumn, filterValue);
    } catch (error) {
      console.error(error);
      alert("Could not apply global filter");
    }

    setLoading(false);
  };

  const resetGlobalFilter = async () => {
    if (!currentDatasetId) return;

    try {
      setLoading(true);
      setFilterColumn("");
      setFilterValue("");
      await fetchAutoDashboard(currentDatasetId);
    } catch (error) {
      console.error(error);
      alert("Could not reset filter");
    }

    setLoading(false);
  };

  const askGenericAssistant = async () => {
    if (!currentDatasetId) {
      alert("Please upload a dataset first");
      return;
    }

    if (!genericChatQuestion.trim()) {
      alert("Please enter a question first");
      return;
    }

    try {
      const currentQuestion = genericChatQuestion;
      setGenericChatQuestion("");

      const response = await axios.post(`http://127.0.0.1:8000/datasets/${currentDatasetId}/chat`, {
        question: currentQuestion,
      });

      setGenericChatHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Generic chat assistant failed");
    }
  };

  const loadOlistAnalytics = async () => {
    try {
      setLoading(true);

      setUploadData(null);
      setProfileData(null);
      setGenericInsights(null);
      setAutoDashboard(null);
      setSelectedAutoChart(0);
      setCurrentDatasetId(null);
      setFilterColumn("");
      setFilterValue("");
      setGenericSummary(null);
      setGenericChatQuestion("");
      setGenericChatHistory([]);
      setFile(null);
      setChatHistory([]);

      const analyticsResponse = await axios.get("http://127.0.0.1:8000/olist/analytics");
      setOlistData(analyticsResponse.data);

      const insightsResponse = await axios.get("http://127.0.0.1:8000/olist/business-insights");
      setBusinessInsights(insightsResponse.data);

      const forecastResponse = await axios.get("http://127.0.0.1:8000/olist/forecast");
      setForecastData(forecastResponse.data);

      const executiveResponse = await axios.get("http://127.0.0.1:8000/olist/executive-summary");
      setExecutiveSummary(executiveResponse.data);
    } catch (error) {
      console.error(error);
      alert("Could not load Olist analytics");
    }

    setLoading(false);
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/olist/report");
      const reportBlob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: "application/json",
      });

      const url = window.URL.createObjectURL(reportBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "datalens_olist_business_report.json";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Could not download report");
    }
  };

  const askAssistant = async () => {
    if (!chatQuestion.trim()) return;

    try {
      const currentQuestion = chatQuestion;
      setChatQuestion("");

      const response = await axios.post("http://127.0.0.1:8000/olist/chat", {
        question: currentQuestion,
      });

      setChatHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Chat assistant failed");
    }
  };

  const profileChartData =
    profileData?.column_profiles?.map((col) => ({
      name: col.name,
      missing: col.missing_count,
      unique: col.unique_count,
    })) || [];

  const combinedForecastChart = olistData && forecastData
    ? [
      ...olistData.monthly_sales.map((item) => ({
        period: item.month,
        actual: item.price,
        forecast: null,
      })),
      ...forecastData.forecast.map((item) => ({
        period: item.period,
        actual: null,
        forecast: item.predicted_revenue,
      })),
    ]
    : [];

  const filterColumns = autoDashboard?.filter_options
    ? Object.keys(autoDashboard.filter_options)
    : [];

  const filterValues = filterColumn && autoDashboard?.filter_options?.[filterColumn]
    ? autoDashboard.filter_options[filterColumn]
    : [];

  const getAutoChartKeys = (chart) => {
    if (!chart || !chart.data || chart.data.length === 0) {
      return { xKey: "label", yKey: "count" };
    }

    if (chart.chart_type === "missing_values") {
      return { xKey: "column", yKey: "missing" };
    }

    if (chart.chart_type === "categorical_distribution") {
      return { xKey: "label", yKey: "count" };
    }

    if (chart.chart_type === "numeric_distribution") {
      return { xKey: "index", yKey: "value" };
    }

    return { xKey: "label", yKey: "count" };
  };

  const renderSelectedAutoChart = () => {
    if (!autoDashboard?.charts || autoDashboard.charts.length === 0) return null;

    const chart = autoDashboard.charts[selectedAutoChart];
    if (!chart || !chart.data || chart.data.length === 0) return null;

    const { xKey, yKey } = getAutoChartKeys(chart);

    return (
      <div style={panelStyle}>
        <h2 style={sectionTitle}>Interactive Chart Viewer</h2>

        <div style={selectorRow}>
          <label style={selectorLabel}>Select chart:</label>
          <select
            value={selectedAutoChart}
            onChange={(e) => setSelectedAutoChart(Number(e.target.value))}
            style={selectStyle}
          >
            {autoDashboard.charts.map((item, index) => (
              <option key={index} value={index}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <h3 style={subSectionTitle}>{chart.title}</h3>

        <ResponsiveContainer width="100%" height={420}>
          {chart.chart_type === "numeric_distribution" ? (
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Line type="monotone" dataKey={yKey} stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          ) : (
            <BarChart data={chart.data}>
              <XAxis dataKey={xKey} stroke="#ffffff" angle={-15} textAnchor="end" interval={0} height={90} tick={{ fontSize: 10 }} />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey={yKey} fill={chart.chart_type === "missing_values" ? "#EF4444" : "#10B981"} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <h1 style={mainTitle}>DataLens AI Business Intelligence Dashboard</h1>

      <div style={uploadPanel}>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload} style={buttonBlue}>
          {loading ? "Loading..." : "Upload & Profile CSV"}
        </button>

        <button onClick={loadOlistAnalytics} style={buttonGreen}>
          {loading ? "Loading..." : "Load Olist Analytics"}
        </button>

        <button onClick={downloadReport} style={buttonPurple}>
          Download Report
        </button>

        <button onClick={clearDashboard} style={buttonRed}>
          Clear Dashboard
        </button>
      </div>

      {uploadData && (
        <div style={panelStyle}>
          <h2 style={sectionTitle}>Generic CSV Analysis</h2>

          <div style={cardGrid}>
            <div style={cardStyle}><h2>Rows</h2><h1>{uploadData.rows}</h1></div>
            <div style={cardStyle}><h2>Columns</h2><h1>{uploadData.columns}</h1></div>
            <div style={cardStyle}><h2>Dataset</h2><h3>{uploadData.filename}</h3></div>
          </div>

          {genericSummary && (
            <div style={executivePanel}>
              <h2 style={sectionTitle}>Generic AI Executive Summary</h2>
              <div style={summaryBox}>{genericSummary.executive_summary}</div>

              <div style={takeawayBox}>
                <strong>Recommendations:</strong>
                <ul>
                  {genericSummary.recommendations?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {autoDashboard && (
            <>
              <h2 style={sectionTitle}>Global Dashboard Filters</h2>

              <div style={filterPanel}>
                <div>
                  <label style={selectorLabel}>Filter column</label><br />
                  <select
                    value={filterColumn}
                    onChange={(e) => {
                      setFilterColumn(e.target.value);
                      setFilterValue("");
                    }}
                    style={selectStyle}
                  >
                    <option value="">Select column</option>
                    {filterColumns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={selectorLabel}>Filter value</label><br />
                  <select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={selectStyle}
                    disabled={!filterColumn}
                  >
                    <option value="">Select value</option>
                    {filterValues.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <button onClick={applyGlobalFilter} style={buttonGreen}>
                  Apply Filter
                </button>

                <button onClick={resetGlobalFilter} style={buttonRed}>
                  Reset Filter
                </button>
              </div>

              <div style={filterStatusBox}>
                <strong>Rows shown:</strong>{" "}
                {autoDashboard.dataset_shape?.filtered_rows ?? autoDashboard.dataset_shape?.rows} /{" "}
                {autoDashboard.dataset_shape?.original_rows ?? uploadData.rows}
                {autoDashboard.active_filter?.filter_column && autoDashboard.active_filter?.filter_value && (
                  <>
                    <br />
                    <strong>Active filter:</strong>{" "}
                    {autoDashboard.active_filter.filter_column} = {autoDashboard.active_filter.filter_value}
                  </>
                )}
              </div>

              <h2 style={sectionTitle}>Auto-Generated Dashboard</h2>

              <div style={cardGrid}>
                {autoDashboard.kpis?.map((kpi, index) => (
                  <div key={index} style={cardStyle}>
                    <h2>{kpi.column}</h2>
                    <p><strong>Mean:</strong> {kpi.mean}</p>
                    <p><strong>Max:</strong> {kpi.max}</p>
                    <p><strong>Min:</strong> {kpi.min}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {profileData && (
            <div style={panelStyleInner}>
              <h2 style={sectionTitle}>Column Quality Overview</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={profileChartData}>
                  <XAxis dataKey="name" stroke="#ffffff" angle={-15} textAnchor="end" interval={0} height={80} tick={{ fontSize: 10 }} />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="missing" fill="#EF4444" />
                  <Bar dataKey="unique" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {genericInsights && (
            <div style={{ marginTop: "25px" }}>
              <h3 style={{ color: "#3B82F6", fontSize: "26px", textAlign: "center" }}>Dataset Insights</h3>
              {genericInsights.insights.map((item, index) => (
                <div key={index} style={insightBox}>{item}</div>
              ))}
            </div>
          )}

          <div style={chatPanel}>
            <h2 style={sectionTitle}>Generic AI Chat Assistant</h2>

            <div style={chatInputRow}>
              <input
                value={genericChatQuestion}
                onChange={(e) => setGenericChatQuestion(e.target.value)}
                placeholder="Ask about rows, columns, missing values, KPIs, categories, filters, or summary..."
                style={chatInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askGenericAssistant();
                }}
              />

              <button onClick={askGenericAssistant} style={buttonGreen}>
                Ask
              </button>
            </div>

            <div>
              {genericChatHistory.map((chat, index) => (
                <div key={index} style={chatMessage}>
                  <div style={questionBox}>
                    <strong>You:</strong> {chat.question}
                  </div>
                  <div style={answerBox}>
                    <strong>Assistant:</strong> {chat.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {autoDashboard && renderSelectedAutoChart()}

      {executiveSummary && (
        <div style={executivePanel}>
          <h2 style={sectionTitle}>AI Executive Summary</h2>
          <div style={summaryBox}>{executiveSummary.executive_summary}</div>
          <div style={takeawayBox}>
            <strong>Strategic Takeaway:</strong><br /><br />
            {executiveSummary.strategic_takeaway}
          </div>
        </div>
      )}

      {olistData && (
        <>
          <h2 style={businessTitle}>Olist Business Analytics</h2>

          <div style={cardGridFour}>
            <div style={cardStyle}><h2>Avg Delivery Days</h2><h1>{olistData.average_delivery_days}</h1></div>
            <div style={cardStyle}><h2>Top Revenue State</h2><h1>{olistData.state_sales[0]?.customer_state}</h1></div>
            <div style={cardStyle}><h2>Top Category</h2><h3>{olistData.top_categories[0]?.product_category_name}</h3></div>
            <div style={cardStyle}>
              <h2>Peak Month</h2>
              <h3>{olistData.monthly_sales.reduce((max, item) => item.price > max.price ? item : max).month}</h3>
            </div>
          </div>

          <div style={panelStyle}>
            <h2 style={sectionTitle}>Monthly Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={olistData.monthly_sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={panelStyle}>
            <h2 style={sectionTitle}>Top Product Categories by Revenue</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={olistData.top_categories}>
                <XAxis dataKey="product_category_name" stroke="#ffffff" angle={-15} textAnchor="end" interval={0} height={80} tick={{ fontSize: 10 }} />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Bar dataKey="price" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={panelStyle}>
            <h2 style={sectionTitle}>Top Customer States by Revenue</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={olistData.state_sales}>
                <XAxis dataKey="customer_state" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Bar dataKey="price" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={panelStyle}>
            <h2 style={sectionTitle}>Revenue Share by Customer State</h2>
            <ResponsiveContainer width="100%" height={420}>
              <PieChart>
                <Pie data={olistData.state_sales} dataKey="price" nameKey="customer_state" outerRadius={160} label>
                  {olistData.state_sales.map((entry, index) => (
                    <Cell key={`state-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {forecastData && (
        <div style={panelStyle}>
          <h2 style={sectionTitle}>Revenue Forecast</h2>

          <div style={cardGrid}>
            <div style={cardStyle}><h2>Forecast Method</h2><p>{forecastData.method}</p></div>
            <div style={cardStyle}><h2>Recent Avg Revenue</h2><h1>{forecastData.recent_average_revenue}</h1></div>
            <div style={cardStyle}><h2>Forecast Month 3</h2><h1>{forecastData.forecast[2]?.predicted_revenue}</h1></div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={combinedForecastChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} connectNulls />
              <Line type="monotone" dataKey="forecast" stroke="#EF4444" strokeWidth={3} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {businessInsights && (
        <div style={panelStyle}>
          <h2 style={sectionTitle}>Business Insights</h2>

          <div style={insightGrid}>
            <div>
              <h3 style={{ marginBottom: "15px", color: "#3B82F6" }}>Key Insights</h3>
              {businessInsights.insights.map((item, index) => (
                <div key={index} style={insightBox}>{item}</div>
              ))}
            </div>

            <div>
              <h3 style={{ marginBottom: "15px", color: "#10B981" }}>Recommendations</h3>
              {businessInsights.recommendations.map((item, index) => (
                <div key={index} style={recommendationBox}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {olistData && (
        <div style={chatPanel}>
          <h2 style={sectionTitle}>AI Chat Assistant</h2>

          <div style={chatInputRow}>
            <input
              value={chatQuestion}
              onChange={(e) => setChatQuestion(e.target.value)}
              placeholder="Ask about top category, top state, forecast, delivery, recommendations..."
              style={chatInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") askAssistant();
              }}
            />

            <button onClick={askAssistant} style={buttonGreen}>
              Ask
            </button>
          </div>

          <div>
            {chatHistory.map((chat, index) => (
              <div key={index} style={chatMessage}>
                <div style={questionBox}>
                  <strong>You:</strong> {chat.question}
                </div>
                <div style={answerBox}>
                  <strong>Assistant:</strong> {chat.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const pageStyle = { minHeight: "100vh", backgroundColor: "#0F172A", color: "white", padding: "30px", fontFamily: "Arial" };

const mainTitle = {
  textAlign: "center",
  fontSize: "42px",
  lineHeight: "1.15",
  marginBottom: "30px",
  maxWidth: "900px",
  marginLeft: "auto",
  marginRight: "auto",
};

const uploadPanel = {
  backgroundColor: "#1E293B",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "30px",
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const executivePanel = { backgroundColor: "#1E293B", padding: "30px", borderRadius: "18px", marginBottom: "40px" };
const summaryBox = { backgroundColor: "#0F172A", padding: "25px", borderRadius: "14px", fontSize: "18px", lineHeight: "1.8", marginBottom: "25px", borderLeft: "5px solid #3B82F6" };
const takeawayBox = { backgroundColor: "#0F172A", padding: "25px", borderRadius: "14px", fontSize: "18px", lineHeight: "1.8", marginBottom: "25px", borderLeft: "5px solid #10B981" };
const cardGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" };
const cardGridFour = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" };
const cardStyle = { backgroundColor: "#1E293B", padding: "25px", borderRadius: "16px", textAlign: "center" };
const panelStyle = { backgroundColor: "#1E293B", padding: "25px", borderRadius: "16px", marginBottom: "30px" };
const panelStyleInner = { backgroundColor: "#0F172A", padding: "20px", borderRadius: "16px", marginBottom: "30px" };
const sectionTitle = { marginBottom: "20px", fontSize: "34px", textAlign: "center" };
const subSectionTitle = { marginBottom: "20px", fontSize: "28px", textAlign: "center" };
const businessTitle = { fontSize: "44px", marginTop: "50px", marginBottom: "25px", textAlign: "center" };
const insightGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" };
const insightBox = { backgroundColor: "#0F172A", padding: "15px", borderRadius: "12px", marginBottom: "15px", borderLeft: "4px solid #3B82F6" };
const recommendationBox = { backgroundColor: "#0F172A", padding: "15px", borderRadius: "12px", marginBottom: "15px", borderLeft: "4px solid #10B981" };
const chatPanel = { backgroundColor: "#1E293B", padding: "25px", borderRadius: "16px", marginBottom: "30px" };
const chatInputRow = { display: "flex", gap: "15px", marginBottom: "25px" };
const chatInput = { flex: 1, padding: "14px", borderRadius: "10px", border: "none", fontSize: "16px" };
const chatMessage = { marginBottom: "18px" };
const questionBox = { backgroundColor: "#334155", padding: "14px", borderRadius: "10px", marginBottom: "8px" };
const answerBox = { backgroundColor: "#0F172A", padding: "14px", borderRadius: "10px", borderLeft: "4px solid #10B981" };
const selectorRow = { display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "25px", flexWrap: "wrap" };
const selectorLabel = { fontSize: "18px", fontWeight: "bold" };
const selectStyle = { padding: "12px", borderRadius: "10px", border: "none", fontSize: "16px", minWidth: "320px" };
const filterPanel = { backgroundColor: "#0F172A", padding: "25px", borderRadius: "16px", display: "flex", gap: "18px", justifyContent: "center", alignItems: "end", flexWrap: "wrap", marginBottom: "25px" };
const filterStatusBox = { backgroundColor: "#0F172A", padding: "18px", borderRadius: "12px", marginBottom: "25px", textAlign: "center", borderLeft: "4px solid #F59E0B" };
const buttonBlue = { backgroundColor: "#3B82F6", border: "none", padding: "14px 28px", color: "white", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };
const buttonGreen = { backgroundColor: "#10B981", border: "none", padding: "14px 28px", color: "white", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };
const buttonPurple = { backgroundColor: "#8B5CF6", border: "none", padding: "14px 28px", color: "white", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };
const buttonRed = { backgroundColor: "#EF4444", border: "none", padding: "14px 28px", color: "white", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };

export default App;
