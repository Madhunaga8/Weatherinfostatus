import { LightningElement } from 'lwc';
import getWeatherDetails from '@salesforce/apex/WeatherDetailsClass.getWeatherDetails'
export default class WeatherScreen extends LightningElement {
		inputCityName = ' ';
		weatherDetails ={};
		showWeatherDetails = false;
		showspinner = false
		showResetbtn = false
		showCancelbtn = false
		city = ' '
		Tempareture = ' '
		Humidity = ' '
		LastObservationOn = ' '
		windspeed = ' '
		latitude = ' '
		longitude = ' '
		handleInputChange(event){
				this.inputCityName = event.target.value;
		}
		
		handleWeatherDetails(){
				getWeatherDetails({cityName : this.inputCityName})
				.then((result) => {
						this.showWeatherDetails = true;
						this.showCancelbtn = true;
						this.city = this.inputCityName;
						this.weatherDetails = result;
						this.Tempareture = this.weatherDetails.current_condition[0]['temp_C']
						this.Humidity = this.weatherDetails.current_condition[0]['humidity']
						this.LastObservationOn = this.weatherDetails.current_condition[0]['localObsDateTime']
						this.windspeed = this.weatherDetails.current_condition[0]['windspeedKmph']
						this.latitude = this.weatherDetails.nearest_area[0]['latitude']
						this.longitude = this.weatherDetails.nearest_area[0]['longitude']
				})
				.catch((error) =>{
					this.showspinner = true
					setTimeout(() => {
						this.showspinner = false
					}, 5000);
					setTimeout(() => {
						this.showResetbtn = true;
					}, 5025);
				});
		}

		handleReset(){
			   this.inputCityName = ' ';
			   this.showResetbtn = false;
		}

		handleCancel(){
			this.showWeatherDetails = false;
		}
		
}