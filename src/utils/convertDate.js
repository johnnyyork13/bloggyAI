export default function convertDate(date){
    const d = new Date(date);
    const time = d.toLocaleString();
    return time.split(',');
}

