
// your code here
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Invalid input!');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error.message);
  } finally {
    // finally = this is executed anyway, whether the execution was successful or not
    console.log('asynchronous load complete');
  }
}
try {
  const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants';
  const restaurants = await fetchData(url);
  console.log(restaurants);

  const table = document.querySelector('table');
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  console.log('table', table);

  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');
    const td_name = document.createElement('td');
    const td_address = document.createElement('td');

    console.log(restaurant.name, restaurant.address);
    tr.appendChild(td_name);
    tr.appendChild(td_address);
    table.appendChild(tr);

    td_name.innerText = restaurant.name;
    td_address.innerText = restaurant.address;

    tr.addEventListener('click', async () => {
      const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurant._id}/en`;
      const data = await fetchData(url);
      console.log(data);
      document
        .querySelectorAll('.highlight')
        .forEach((element) => element.classList.remove('highlight'));

      td_name.classList.add('highlight');
      td_address.classList.add('highlight');
      const dialog = document.querySelector('dialog');
      let menu = '';

      for (let course of data.courses) {
        const diets = Array.isArray(course.diets)
          ? course.diets
          : course.diets.split(',').map((diet) => diet.trim());
        const filteredDiets = diets.filter((diet) => diet !== '*');
        const dietIcons = filteredDiets.map((diet) => {
          switch (diet) {
            case 'G':
              return '🌾&#xfeff;🚫';
            case 'L':
              return '🥛&#xfeff;🚫';
            default:
              return diet;
          }
        });

        menu += `
        <tr>
          <td>${course.name}</td>
          <td>${course.price || 'Not provided'}</td>
          <td>${dietIcons}</td>
        
        </tr>
      `;
      }
      dialog.close();
      dialog.innerHTML = `
  Name: ${restaurant.name}<br>
  Address: ${restaurant.address}<br>
  Phone: ${restaurant.phone}<br>
  Company: ${restaurant.company}<br>
  City: ${restaurant.city}<br>
  Postal Code: ${restaurant.postalCode}<br></br>
  
  <table>
    ${menu}
  </table>

  
  `;
      dialog.show();
    });
  }
} catch (error) {
  alert('An error occurred:', error);
  console.error('An error occurred:', error);
}

  