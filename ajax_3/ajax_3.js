    console.log('the script starts');
 async function asynchronousFunction() {                 
        console.log('asynchronous download begins');
          
        try {                                               // error handling: try/catch/finally
            const response = await fetch("https://reqres.in/api/unknown/23");
                  // retrieving the data retrieved from the response object using the json() function
            if (!response.ok) {
        throw new Error('Invalid input!');
    }

    const json = await response.json();

} catch (e) {
    console.log('error', e);
    }

 }
 asynchronousFunction();

console.log('the script ends');