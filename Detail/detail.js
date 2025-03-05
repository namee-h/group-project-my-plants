function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('preview').src = "";
    }
  }

  // 🚨 1. DB에서 식물정보 뿌려주는 로직 

  // 식물 정보 수정 및 저장
  document.querySelectorAll(".edit-btn").forEach((button)=>{
    button.addEventListener("click",(event)=>{
      const targetId = event.currentTarget.dataset.target;
      const targetElement = document.getElementById(targetId);

      // 눌렀을때 수정가능하게
      targetElement.contentEditable = "true";
      targetElement.focus();
      targetElement.style.border = "2px solid #4CAF50";
      targetElement.style.borderRadius = "10px"

      // 🚨 3. DB에 저장하는 함수 호출 
    })
  })
  
  // 🚨 2. DB에 저장하는 함수
  
  
  
// 물 주기 섹션
