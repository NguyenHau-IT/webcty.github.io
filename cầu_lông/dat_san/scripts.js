document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const courtNumber = document.getElementById('courtNumber').value.trim();
    const courtId = document.getElementById('courtId').value.trim();
    const rentalDuration = document.getElementById('rentalDuration').value.trim();
    const startTime = document.getElementById('startTime').value.trim();
    const date = document.getElementById('date').value.trim();

    // Kiểm tra các trường không được để trống
    if (!name || !phone || !courtNumber || !courtId || !rentalDuration || !startTime || !date) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    // Kiểm tra định dạng ngày theo dd/mm/yyyy
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(date)) {
        alert('Ngày nhận không đúng định dạng dd/mm/yyyy.');
        return;
    }

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Đặt sân thành công!');
            form.reset();
        } else {
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
    });
});

function goback(){
    window.history.back();
}