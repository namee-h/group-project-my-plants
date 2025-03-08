const sessionValue = sessionStorage.getItem("plantsSessionNumOne");
const loginButton = document.getElementById("index-login");
const memberName = document.getElementById("index-member-name");
const signButton = document.getElementById("index-signup");
const indexMyPlantsSection = document.getElementById("index-my-plants-section");
const indexMyPlantsHr = document.getElementById("index-my-plants-hr");
const indexMyPlantsH5 = document.getElementById("index-my-plants-h5");
const indexMyPlantsBox = document.getElementById("index-my-plants-box");
const indexMyPlantsH6 = document.querySelector(".index-my-plants-h6");
const indexFeed = document.querySelector("#index-feed");
const ownerName = document.querySelector(".owner-name");

if (sessionValue !== null) {
  fetch("https://silk-scandalous-boa.glitch.me/members")
    .then((response) => response.json())
    .then((data) => {
      const member = data.find((member) => member.id === sessionValue);
      console.log("Member:", member); // 멤버 확인: undefined, DB 불일치
      if (member) {
        loginButton.href = "";
        loginButton.textContent = "Logout";
        memberName.innerHTML = `<strong>${member.name}🌱</strong>님 환영합니다.`;
        ownerName.innerHTML = `<strong>🌵${member.name}</strong>님의 식물 피드🌵</i>`;

        // memberName.textContent = `${member.name}님 환영합니다.`;
        signButton.href = `myInfo/myInfo.html?id=${sessionValue}`;
        signButton.textContent = "My Info";
        indexMyPlantsSection.style.display = "flex"; // 내가 등록한 식물 보이기
        indexMyPlantsHr.style.display = "flex"; // hr 보이기
        indexMyPlantsH5.style.display = "flex"; // h5 보이기
        indexMyPlantsBox.style.display = "flex"; // 식물 박스 보이기
        indexMyPlantsH6.style.display = "flex"; // h6 보이기
        myPlantData(member.id);
      } else {
        console.log("⚠️ 로그인된 사용자 정보가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // 로그아웃 기능
  loginButton.addEventListener("click", () => {
    sessionStorage.removeItem("plantsSessionNumOne"); // 로그인 정보 삭제
    window.location.href = "/Login/login.html";
  });

  memberName.classList.remove("display-none");
}

myPlantData = async (memberId) => {
  const response = await fetch(`https://silk-scandalous-boa.glitch.me/plants/`);
  const data = await response.json();
  let feedHTML = `<div class="index-my-plants-list">
            <a href="/Update/update.html" id="index-add-plant" class="index-plant"> + </a>
          </div>`;
  for (let i = 0; i < data.length; i++) {
    if (data[i].member_id === memberId && data[i].plant_main_img !== null && data[i].plant_main_img !== undefined && data[i].plants_name !== undefined) {
      console.log(data[i]);
      feedHTML += `
      <div class="index-my-plants-list">
        <a href="/Detail/detail.html?plants_id=${data[i].id}" class="index-plant">
          <img
          src="${data[i].plant_main_img}"
          alt="${data[i].plants_name}"
          />
        </a>
      </div>`;
    }
  }
  document.getElementById("index-my-plants-section").innerHTML = feedHTML;
};

// 식물 피드
const mainfeedList = async () => {
  const response = await fetch(`https://silk-scandalous-boa.glitch.me/plants/`);
  const data = await response.json();
  
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].plant_main_img !== null && data[i].plant_main_img !== undefined) {
      const feedItem = document.createElement("div");
      feedItem.classList.add("feed-item");
    
      feedItem.innerHTML = `
            <a class="index-feed-plant position-relative">
            <div class="heart-badge" onclick="toggleHeart(this)">
              <i class="bi bi-heart"></i>
            </div>
              <img
              src="${data[i].plant_main_img}"
              alt="${data[i].plants_name}"
              />
            </a>
            <div class="comment-section">
            <input type="text" id="commentInput" class="comment-input" placeholder="소중한 한마디를 남겨주세요 💬">
            <button class="comment-button" onclick="addComment(event)">등록</button>
            <ul id="commentList" class="comment-list"></ul>
        </div>
            `;
  
      document.querySelector("#index-feed").append(feedItem);
    }
  }
}
function addComment(event) {
  if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
      const button = event.target.closest(".comment-section"); // 클릭한 버튼이 속한 댓글 섹션 찾기
      const commentInput = button.querySelector(".comment-input"); // 입력창 찾기
      const commentList = button.querySelector(".comment-list"); // 해당 피드의 댓글 목록 찾기
      const comment = commentInput.value.trim(); // 입력한 댓글 내용 가져오기

      if (sessionValue === null) {
          alert("로그인 후 이용해주세요.");
          commentInput.value = "";
          return;
      }

      if (comment === "") {
          alert("소중한 한마디를 남겨주세요 💬");
          return;
      }

      const commentItem = document.createElement("li");
      commentItem.textContent = comment;
      commentList.appendChild(commentItem);
      commentInput.value = ""; // 댓글 입력창 초기화
  }
}

function toggleHeart(element) {
  if (sessionValue === null) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  element.classList.toggle("liked"); 
  const icon = element.querySelector("i");

  if (element.classList.contains("liked")) {
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill");
      icon.style.color = "red";
  } else {
      icon.classList.remove("bi-heart-fill");
      icon.classList.add("bi-heart");
      icon.style.color = "gray";
  }
}

mainfeedList();

// 맨 위로 가기 버튼 추가
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector("#index-top-button");

  window.addEventListener("scroll", () => {
    // console.log("ScrollY:", window.scrollY); // 현재 스크롤 위치 확인

    if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
