from fastapi.testclient import TestClient
from app.main import app
import io

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200


def test_upload_valid_csv():
    csv_content = b"id,name,city,sales\n1,Ali,Lahore,100\n2,Sara,Karachi,200\n"
    files = {"file": ("test.csv", io.BytesIO(csv_content), "text/csv")}

    response = client.post("/upload-csv", files=files)

    assert response.status_code == 200
    assert "dataset_id" in response.json()


def test_list_datasets():
    response = client.get("/datasets")
    assert response.status_code == 200
    assert "datasets" in response.json()


def test_profile_dataset():
    upload = client.post(
        "/upload-csv",
        files={"file": ("profile.csv", io.BytesIO(b"id,name,sales\n1,A,10\n2,B,20\n"), "text/csv")}
    )

    dataset_id = upload.json()["dataset_id"]

    response = client.get(f"/datasets/{dataset_id}/profile")

    assert response.status_code == 200
    assert "column_profiles" in response.json()


def test_dataset_insights():
    upload = client.post(
        "/upload-csv",
        files={"file": ("insights.csv", io.BytesIO(b"id,city,sales\n1,Lahore,100\n2,Karachi,200\n"), "text/csv")}
    )

    dataset_id = upload.json()["dataset_id"]

    response = client.get(f"/datasets/{dataset_id}/insights")

    assert response.status_code == 200
    assert "insights" in response.json()


def test_auto_dashboard():
    upload = client.post(
        "/upload-csv",
        files={"file": ("dashboard.csv", io.BytesIO(b"id,city,sales\n1,Lahore,100\n2,Karachi,200\n"), "text/csv")}
    )

    dataset_id = upload.json()["dataset_id"]

    response = client.get(f"/datasets/{dataset_id}/auto-dashboard")

    assert response.status_code == 200
    assert "charts" in response.json()
    assert "kpis" in response.json()


def test_auto_dashboard_filter():
    upload = client.post(
        "/upload-csv",
        files={"file": ("filter.csv", io.BytesIO(b"id,city,sales\n1,Lahore,100\n2,Karachi,200\n3,Lahore,300\n"), "text/csv")}
    )

    dataset_id = upload.json()["dataset_id"]

    response = client.get(
        f"/datasets/{dataset_id}/auto-dashboard?filter_column=city&filter_value=Lahore"
    )

    assert response.status_code == 200
    assert response.json()["dataset_shape"]["filtered_rows"] == 2


def test_executive_summary():
    upload = client.post(
        "/upload-csv",
        files={"file": ("summary.csv", io.BytesIO(b"id,city,sales\n1,Lahore,100\n2,Karachi,200\n"), "text/csv")}
    )

    dataset_id = upload.json()["dataset_id"]

    response = client.get(f"/datasets/{dataset_id}/executive-summary")

    assert response.status_code == 200
    assert "executive_summary" in response.json()


def test_chat_endpoint():
    upload = client.post(
        "/upload-csv",
        files={"file": ("chat.csv", io.BytesIO(b"id,city,sales\n1,Lahore,100\n2,Karachi,200\n"), "text/csv")}
    )

    dataset_id = upload.json()["dataset_id"]

    response = client.post(
        f"/datasets/{dataset_id}/chat",
        json={"question": "Summarize this dataset"}
    )

    assert response.status_code == 200
    assert "answer" in response.json()


def test_invalid_dataset_profile():
    response = client.get("/datasets/999999/profile")
    assert response.status_code in [404, 500]