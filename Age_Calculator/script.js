document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("date");
  const calculateButton = document.getElementById("calculateButton");

  userInput.max = new Date().toISOString().split("T")[0];

  calculateButton.addEventListener("click", calculateAge);
});

const calculateAge = () => {
  const userInput = document.getElementById("date");
  const result = document.getElementById("result");

  if (!userInput.value) {
    result.innerHTML = "<p>Please select a valid date.</p>";
    return;
  }

  const birthDate = new Date(userInput.value);
  const today = new Date();

  const ageData = getAgeData(birthDate, today);

  result.innerHTML = `
      <p>Your Birth Date is: ${birthDate.toLocaleDateString()}</p>
      <p>Today's Date is: ${today.toLocaleDateString()}</p>
      <p>You are ${ageData.years} years, ${ageData.months} months, and ${
    ageData.days
  } days old.</p>
    `;
};

const getAgeData = (birthDate, today) => {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += getDaysInMonth(today.getFullYear(), today.getMonth());
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
