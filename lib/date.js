const getTimestamp = () => {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const day = current.getDate();
    const hour = current.getHours();
    const seconds = current.getSeconds();
  
    return year + '-' + month + '-' + day + ' ' + hour + ':' + seconds
}

module.exports = getTimestamp;