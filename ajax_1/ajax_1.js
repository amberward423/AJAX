    console.log('the script starts');


    async function asynchronousFunction() {                 
        console.log('asynchronous download begins');
        try {                                               // error handling: try/catch/finally
            const res = await fetch(
        "https://reqres.in/api/users/1",
            { headers: { "x-api-key": "reqres-free-v1" } });
        const jsonData = await res.json();         // retrieving the data retrieved from the response object using the json() function
            console.log(jsonData);    // log the result to the console
        } catch (error) {
            console.log(error.message);
        } finally {                                         // finally = this is executed anyway, whether the execution was successful or not
            console.log('asynchronous load complete');
        }
    }

    asynchronousFunction();

    console.log('the script ends');