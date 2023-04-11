import axios from 'axios';
// all requests will live here

const BASE_URL = "http://localhost:8080"
export function postTestimonial(data){
    return axios.post(`${BASE_URL}/testimonial`, data);
}