import moment from "moment"


export const isEmailValid = (email) => {
	return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
  };
  
export const isPasswordValid = (password) => {
	return !!password && password != "" && password.length >= 4;
};

export const isProductOld = (date) => {
	return productDay(date) > 0
}

export const isProductTooOld = (date) => {
	return productDay(date) > 2
}

const productDay = (date) => {
	const day = moment(date).diff(moment(), "days")
	return day
}

export const getPriceDiscounted = (date, price) => {

	const day = productDay(date)
	let newPrice;

	switch(day) {
		case 0:
			newPrice = price
			break
		case 1:
			newPrice = price - (price*0.2)
			break
		case 2:
			newPrice = price - (price*0.8)
			break
		default:
			newPrice = 0
			break
	}

	return parseFloat(newPrice).toFixed(2)

}