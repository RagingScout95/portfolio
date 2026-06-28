# Local development — use this when backend runs on localhost
# Copy over environment.ts OR point apiUrl here while developing

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8082/api'   // local backend (prod profile uses 8082)
  // apiUrl: 'http://localhost:8080/api'   // if using dev profile on 8080
  // apiUrl: 'https://portfolio-api.ragingscout97.in/api'  // remote API
};
