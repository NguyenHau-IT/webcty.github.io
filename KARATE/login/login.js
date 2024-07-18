document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    const successMessage = document.createElement("p");
    successMessage.classList.add("success-message");
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");

    form.appendChild(successMessage);
    form.appendChild(errorMessage);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = form.querySelector("#name").value.trim();
        const phone = form.querySelector("#phone").value.trim();
        const classSelection = form.querySelector("#class").value;

        if (name === "" || phone === "" || classSelection === "") {
            errorMessage.textContent = "Vui lòng điền đầy đủ thông tin.";
            successMessage.textContent = "";
        } else {
            // Gửi dữ liệu bằng AJAX (hoặc sử dụng Formspree)
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("class", classSelection);

            fetch(form.getAttribute("action"), {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    successMessage.textContent = "Form đã được gửi thành công!";
                    errorMessage.textContent = "";
                    form.reset();
                } else {
                    errorMessage.textContent = "Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.";
                    successMessage.textContent = "";
                }
            })
            .catch(error => {
                errorMessage.textContent = "Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.";
                successMessage.textContent = "";
            });
            setTimeout(function() {
                window.history.back();
            }, 3000);
        }
    });
});

function goback(){
    window.history.back();
}