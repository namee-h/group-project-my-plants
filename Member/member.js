document.addEventListener("DOMContentLoaded", function () {
  const addressInput = document.getElementById("address");

  addressInput.addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        addressInput.value = data.address;
      },
    }).open();
    addressInput.value = "";
  });
});
