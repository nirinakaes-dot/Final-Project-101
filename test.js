const tablesButton = document.querySelector('#tableBtn');

tablesButton.addEventListener('click', async () => {
  const searchInput = document
    .getElementById('tableInput')
    .value.trim()
    .toUpperCase();

  if (!searchInput) {
    console.log("Enter a competition code like PL, CL, BL1");
    return;
  }

  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/${searchInput}/standings`,
      {
        headers: {
          'X-Auth-Token': "a79ef265e53a4924a21f8ef439129dac",
        },
      }
    );

    const data = await response.json();
    console.log(data);

  } catch (e) {
    console.error(e);
  }
});