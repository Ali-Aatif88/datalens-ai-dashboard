from mcp.server.fastmcp import FastMCP
import requests

mcp = FastMCP("DataLens-MCP")


BASE_URL = "http://127.0.0.1:8000"


@mcp.tool()
def get_olist_analytics():
    """
    Returns complete Olist analytics dashboard data.
    """
    response = requests.get(f"{BASE_URL}/olist/analytics")
    return response.json()


@mcp.tool()
def get_olist_forecast():
    """
    Returns revenue forecasting information.
    """
    response = requests.get(f"{BASE_URL}/olist/forecast")
    return response.json()


@mcp.tool()
def get_olist_business_insights():
    """
    Returns business insights and recommendations.
    """
    response = requests.get(f"{BASE_URL}/olist/business-insights")
    return response.json()


@mcp.tool()
def get_olist_executive_summary():
    """
    Returns executive summary and strategic takeaway.
    """
    response = requests.get(f"{BASE_URL}/olist/executive-summary")
    return response.json()


@mcp.tool()
def get_olist_risk_analysis():
    """
    Returns business risk analysis.
    """
    response = requests.get(f"{BASE_URL}/olist/risk-analysis")
    return response.json()


@mcp.tool()
def get_olist_report():
    """
    Returns complete downloadable business report data.
    """
    response = requests.get(f"{BASE_URL}/olist/report")
    return response.json()


@mcp.tool()
def ask_olist_assistant(question: str):
    """
    Ask the conversational analytics assistant questions.
    """
    response = requests.post(
        f"{BASE_URL}/olist/chat",
        json={"question": question}
    )

    return response.json()


if __name__ == "__main__":
    mcp.run()