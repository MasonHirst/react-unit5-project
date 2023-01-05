import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDisplay } from '../redux/slices/displayCountrySlice'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/loadingSlice'

const Weather = () => {
   const [weather, setWeather] = useState()

   let currentDisplay = useSelector(selectDisplay)
   const dispatch = useDispatch()
   
   let latitude = currentDisplay.latlng[0]
   let longitude = currentDisplay.latlng[1]
   // console.log('coordinates:', latitude, longitude)

   useEffect(() => {
      dispatch(setLoadingTrue())
      const options = {
         method: 'GET',
         url: 'https://weatherapi-com.p.rapidapi.com/current.json',
         params: { q: `${latitude}, ${longitude}` },
         headers: {
            'X-RapidAPI-Key':
               '315da1cedfmsh2f86a36566a9beap1498b8jsnc25f14276f7b',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
         },
      }

      axios
         .request(options)
         .then(function (response) {
            dispatch(setLoadingFalse())
            console.log('RESPONSE-WEATHER', response.data)
            setWeather(response.data)
         })
         .catch(function (error) {
            dispatch(setLoadingFalse())
            console.error(error)
         })
   }, [])

   // console.log('WEATHER', weather)

   return (
      <div>
         <table className="overview-table">
            <tr>
               <td>Conditions: </td>
               <td>{weather?.current?.condition?.text}</td>
            </tr>
            <tr>
               <td>Temperature: </td>
               <td>{weather?.current?.temp_f}</td>
            </tr>
            <tr>
               <td>Feels Like: </td>
               <td>{weather?.current?.feelslike_f}</td>
            </tr>
            <tr>
               <td>Humidity: </td>
               <td>{weather?.current?.humidity} %</td>
            </tr>
            <tr>
               <td>Wind Speed: </td>
               <td>{weather?.current?.wind_mph} mph</td>
            </tr>
         </table>
      </div>
   )
}

export default Weather
