import dayjs from 'dayjs'
export const useDateFormat = (timetemp: number) => {
    return dayjs.unix(timetemp).format('YYYY-MM-DD HH:mm:ss');
}