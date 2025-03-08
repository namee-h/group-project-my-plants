document.getElementById('sendButton').addEventListener('click', function() {
    const imgData = {
        "id": "test1234",
        "plant_main_img": "/asset/test/test_main.jpg",
        "plant_history": [],
        "plants_id": "testplant",
        "etc": null,
        "update_day": new Date().toISOString()
    };

    fetch("https://silk-scandalous-boa.glitch.me/images", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(imgData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("데이터 전송 성공:", data);
        alert("이미지 데이터 전송 성공!");
    })
    .catch(error => {
        console.error("데이터 전송 실패:", error);
        alert("이미지 데이터 전송 실패!");
    });
});