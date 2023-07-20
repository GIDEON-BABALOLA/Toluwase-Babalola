module.exports.universalDate = function myDate(){
    const today = new Date();
        const currentDay = today.getDay();
        const day = "";
        const options = {
            weekday : "long",
            day : "numeric",
            month : "long"
          //  year : "numeric"
        }
        return today.toLocaleDateString("en-US", options);
    }