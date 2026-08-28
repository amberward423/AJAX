async function fetchData(url,options){
        try {                                               
        const response = await fetch(url,options)
            if (!response.ok) {
                throw new Error('Invalid input!');
    }
        const jsonData = await response.json();
        return jsonData

        } catch (error) {
            console.log(error.message);
        } finally {                                         // finally = this is executed anyway, whether the execution was successful or not
            console.log('asynchronous load complete');
        }
    }
try {
    const user = {
      name: 'John Doe',
      job: 'Developer'
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify(user)
    }
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }