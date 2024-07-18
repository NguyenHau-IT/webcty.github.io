function validateDate() {
    const dateInput = document.getElementById('thoi-gian');
    const dateValue = dateInput.value;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regex.test(dateValue)) {
        alert('Vui lòng nhập ngày theo định dạng dd/mm/yyyy');
        return false;
    }

    return true;
}