import  moment from 'moment';


export function getDate(){
    return moment().format("DD MM YYYY hh:mm:ss");
}