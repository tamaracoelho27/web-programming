// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const selectDateButton = document.querySelector('.btn-1');  // Button to select date
    const calendarDiv = document.getElementById('calendar');    // Calendar div
    const book = document.getElementById('book');
    const confirmbooking = document.querySelector('.btn-2');

    // Add event listener to toggle visibility of the calendar
    selectDateButton.addEventListener('click', function() {
        calendarDiv.classList.toggle('hidden');  // Toggle 'hidden' class on the calendar div
        book.classList.toggle('hidden');
    });

    confirmbooking.addEventListener('click',function(){
        window.location.href = "booking-confirmation.html"
    })
    

});


