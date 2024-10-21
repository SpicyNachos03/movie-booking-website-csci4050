const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const nextButton = document.querySelector('button'); // Assuming the Next button is the only button in the container

const childCount = document.getElementById('childCount');
const adultCount = document.getElementById('adultCount');
const seniorCount = document.getElementById('seniorCount');

let ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  updateTotal();
}

// Update total price
function updateTotal() {
  const childTickets = parseInt(childCount.innerText) * 10;
  const adultTickets = parseInt(adultCount.innerText) * 12;
  const seniorTickets = parseInt(seniorCount.innerText) * 10;
  
  const totalPrice = childTickets + adultTickets + seniorTickets;
  total.innerText = totalPrice;
}

// Check if seats match tickets
function checkSeatsMatchTickets() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected').length;
  const totalTickets = parseInt(childCount.innerText) + parseInt(adultCount.innerText) + parseInt(seniorCount.innerText);
  
  return selectedSeats === totalTickets;
}

// Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') &&
     !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Age counter events
document.querySelectorAll('.counter button').forEach(button => {
  button.addEventListener('click', e => {
    const countSpan = e.target.parentElement.querySelector('.count');
    let count = parseInt(countSpan.innerText);
    
    if (e.target.classList.contains('plus')) {
      count++;
    } else if (e.target.classList.contains('minus') && count > 0) {
      count--;
    }
    
    countSpan.innerText = count;
    updateTotal();
  });
});

// Next button click event
nextButton.addEventListener('click', () => {
  if (!checkSeatsMatchTickets()) {
    alert("The number of selected seats must match the total number of tickets!");
  } else {
    // Proceed to next step (you can add your logic here)
    console.log("Proceeding to next step...");
  }
});

// Initial count and total update
updateSelectedCount();