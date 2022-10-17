export const axiosErrorHandler = error => {
  if (error.response) {
    // The request was made and
    // client received an error response (5xx, 4xx)
    console.log('- error response');
    console.log('data: ', error.response.data);
    console.log('status: ', error.response.status);
    console.log('header: ', error.response.headers);

    // const { data, status, headers } = error.response

    // ex. errorMsg = data.error || data.genError.errorMsg
  } else if (error.request) {
    // client never received a response,
    // or request never left (network error)
    console.log('- error at REQUEST');
    console.log(error.request);

    // ex. errorMsg = error.message
    // OR ex. errorMsg = `${error.name}: ${error.message}`
  } else {
    // anything else
    console.log('- general Error');
    console.log('Error', error.message);
  }
  // console.log('error config ----')
  // console.log(error.config);

  // console.log('errorObj: -----')
  // console.dir(error);
  // OR
  // console.error(error)
  // OR
  // console.error(JSON.stringify(error, null, 2));

  // ex. return setValue({ error: errorMsg, loading: false })
};
