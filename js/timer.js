let minutes_counter = 0;
let seconds_counter = 0;

const timer = () => {
	let $minutes = document.querySelector(".minutes");
	let $seconds = document.querySelector(".seconds");

	seconds_counter++;
	seconds_counter < 10
		? ($seconds.textContent = `0${seconds_counter}`)
		: ($seconds.textContent = seconds_counter);

	if (seconds_counter >= 59) {
		seconds_counter = 0;
		minutes_counter++;
	}

	minutes_counter < 10
		? ($minutes.textContent = `0${minutes_counter}`)
		: ($minutes.textContent = minutes_counter);
};

export default timer;
